<?php
// Koneksi ke database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pulsa_db";

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fonnte WA
define('FONNTE_TOKEN', 'ISI_TOKEN_FONNTE');
define('ADMIN_WA', '6281234567890'); // Admin WA

// Halaman utama (Order Produk)
if ($_SERVER['REQUEST_URI'] == '/' || $_SERVER['REQUEST_URI'] == '/index.php') {
    ?>
    <h1>Order Pulsa</h1>
    <form action="index.php" method="POST">
        <label>Produk:</label>
        <select name="produk_id" required>
            <?php
            $result = $conn->query("SELECT * FROM products");
            while ($row = $result->fetch_assoc()) {
                echo "<option value='{$row['id']}'>{$row['nama_produk']} - Rp" . number_format($row['harga'], 0, ',', '.') . "</option>";
            }
            ?>
        </select><br><br>

        <label>Nomor HP:</label>
        <input type="text" name="nomor_hp" required><br><br>

        <button type="submit">Lanjut Bayar</button>
    </form>
    <?php
}

// Menangani pembuatan order
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $produk_id = $_POST['produk_id'];
    $nomor_hp = $_POST['nomor_hp'];

    // Cari produk
    $result = $conn->query("SELECT * FROM products WHERE id = '$produk_id'");
    $produk = $result->fetch_assoc();

    if (!$produk) {
        die('Produk tidak ditemukan.');
    }

    // Cek stok
    if ($produk['stok'] <= 0) {
        die('Maaf, stok produk ini habis.');
    }

    // Proses order
    $harga = $produk['harga'];
    $nama_produk = $produk['nama_produk'];
    $invoice_id = 'INV' . time();

    // Simpan transaksi
    $conn->query("INSERT INTO transactions (id_produk, nomor_hp, harga, status, invoice_id, created_at) 
    VALUES ('$produk_id', '$nomor_hp', '$harga', 'pending', '$invoice_id', NOW())");

    // Redirect ke QRIS
    header("Location: index.php?invoice=$invoice_id");
    exit;
}

// Halaman pembayaran QRIS
if (isset($_GET['invoice'])) {
    $invoice_id = $_GET['invoice'];

    $result = $conn->query("SELECT t.*, p.nama_produk FROM transactions t JOIN products p ON t.id_produk = p.id WHERE t.invoice_id = '$invoice_id'");
    $trx = $result->fetch_assoc();

    if (!$trx) {
        die('Order tidak ditemukan');
    }

    echo "<h1>Bayar Menggunakan QRIS</h1>";
    echo "<p>Produk: {$trx['nama_produk']}</p>";
    echo "<p>Nomor HP: {$trx['nomor_hp']}</p>";
    echo "<p>Jumlah: <b>Rp" . number_format($trx['harga'], 0, ',', '.') . "</b></p>";

    // QRIS statis (seharusnya diganti dengan QRIS dinamis)
    echo '<img src="qris-gambar.png" style="width:300px;"><br><br>';
    echo '<p>Scan QR di atas untuk bayar.</p>';
    echo '<br>';
    echo "<a href='index.php?cek_bayar=$invoice_id'><button>Saya Sudah Bayar</button></a>";
}

// Cek pembayaran manual
if (isset($_GET['cek_bayar'])) {
    $invoice_id = $_GET['cek_bayar'];

    $result = $conn->query("SELECT * FROM transactions WHERE invoice_id = '$invoice_id'");
    $trx = $result->fetch_assoc();

    if (!$trx) {
        die('Transaksi tidak ditemukan');
    }

    // Kirim WA ke admin
    $target = ADMIN_WA;
    $message = "🚀 Konfirmasi Bayar QRIS\n\nInvoice: {$trx['invoice_id']}\nProduk ID: {$trx['id_produk']}\nNomor: {$trx['nomor_hp']}\nHarga: Rp{$trx['harga']}\n\nCek pembayaran sekarang.";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.fonnte.com/send");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'target' => $target,
        'message' => $message,
    ]);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: " . FONNTE_TOKEN
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo "<h1>✅ Konfirmasi Terkirim!</h1><p>Admin akan cek pembayaran Anda.</p>";
}

// Panel Admin
if (isset($_GET['admin'])) {
    echo "<h1>Admin Panel - Cek Pembayaran</h1>";

    // Ambil semua transaksi pending
    $result = $conn->query("SELECT t.*, p.nama_produk FROM transactions t JOIN products p ON t.id_produk = p.id WHERE status='pending'");
    echo '<table border="1" cellpadding="5" cellspacing="0">';
    echo '<thead><tr><th>Invoice</th><th>Produk</th><th>Nomor HP</th><th>Harga</th><th>Tanggal</th><th>Action</th></tr></thead><tbody>';
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
            <td>{$row['invoice_id']}</td>
            <td>{$row['nama_produk']}</td>
            <td>{$row['nomor_hp']}</td>
            <td>Rp" . number_format($row['harga'], 0, ',', '.') . "</td>
            <td>{$row['created_at']}</td>
            <td><a href='index.php?approve={$row['invoice_id']}'><button>Sudah Dibayar</button></a></td>
        </tr>";
    }
    echo '</tbody></table>';
}

// Approve transaksi dan update stok
if (isset($_GET['approve'])) {
    $invoice_id = $_GET['approve'];

    // Update status transaksi jadi paid
    $conn->query("UPDATE transactions SET status='paid' WHERE invoice_id='$invoice_id'");

    // Ambil data transaksi
    $result = $conn->query("SELECT * FROM transactions WHERE invoice_id = '$invoice_id'");
    $trx = $result->fetch_assoc();

    // Kurangi stok produk
    $conn->query("UPDATE products SET stok = stok - 1 WHERE id = '{$trx['id_produk']}' AND stok > 0");

    // Kirim WA ke pembeli
    $target = $trx['nomor_hp'];
    $message = "✅ Pembayaran Anda sudah kami terima.\n\nProduk akan segera diproses.\n\nInvoice: {$trx['invoice_id']}";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.fonnte.com/send");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'target' => $target,
        'message' => $message,
    ]);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: " . FONNTE_TOKEN
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    // Balik ke admin panel
    header("Location: index.php?admin=true");
    exit;
}

// Manajemen Stok Produk
if (isset($_GET['products'])) {
    echo "<h1>Manajemen Stok Produk</h1>";

    // Ambil semua produk
    $result = $conn->query("SELECT * FROM products");
    echo '<table border="1" cellpadding="5" cellspacing="0">';
    echo '<thead><tr><th>ID</th><th>Nama Produk</th><th>Harga</th><th>Stok Tersedia</th><th>Tambah Stok</th></tr></thead><tbody>';
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
            <td>{$row['id']}</td>
            <td>{$row['nama_produk']}</td>
            <td>Rp" . number_format($row['harga'], 0, ',', '.') . "</td>
            <td>{$row['stok']}</td>
            <td>
                <form action='index.php' method='POST' style='display:inline;'>
                    <input type='hidden' name='produk_id' value='{$row['id']}'>
                    <input type='number' name='jumlah' required>
                    <button type='submit' name='tambah_stok'>Tambah Stok</button>
                </form>
            </td>
        </tr>";
    }
    echo '</tbody></table>';
}

// Tambah Stok Produk
if (isset($_POST['tambah_stok'])) {
    $produk_id = $_POST['produk_id'];
    $jumlah = $_POST['jumlah'];

    // Update stok
    $conn->query("UPDATE products SET stok = stok + $jumlah WHERE id = '$produk_id'");

    // Redirect kembali ke manajemen stok
    header("Location: index.php?products=true");
    exit;
}
?>
