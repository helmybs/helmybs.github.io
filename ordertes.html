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

// Halaman utama (Landing Page)
if ($_SERVER['REQUEST_URI'] == '/' || $_SERVER['REQUEST_URI'] == '/index.php') {
    ?>
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jual Pulsa Online</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            header {
                background-color: #0044cc;
                color: white;
                padding: 20px;
                font-size: 2em;
            }
            .content {
                padding: 40px;
                margin-top: 30px;
            }
            .produk-list {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 20px;
                margin-top: 20px;
            }
            .produk {
                background-color: white;
                border-radius: 8px;
                padding: 20px;
                width: 200px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .produk img {
                max-width: 100px;
                margin-bottom: 10px;
            }
            .produk button {
                background-color: #0044cc;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .produk button:hover {
                background-color: #0033a1;
            }
        </style>
    </head>
    <body>

    <header>
        <h1>Selamat Datang di JualPulsa.com</h1>
        <p>Platform Pembelian Pulsa Termudah dan Terpercaya</p>
    </header>

    <div class="content">
        <h2>Daftar Produk Pulsa</h2>
        <div class="produk-list">
            <?php
            $result = $conn->query("SELECT * FROM products");
            while ($row = $result->fetch_assoc()) {
                echo "
                    <div class='produk'>
                        <img src='icon-pulsa.png' alt='Pulsa'>
                        <h3>{$row['nama_produk']}</h3>
                        <p>Rp" . number_format($row['harga'], 0, ',', '.') . "</p>
                        <a href='index.php?order={$row['id']}'><button>Beli Sekarang</button></a>
                    </div>
                ";
            }
            ?>
        </div>
    </div>

    </body>
    </html>
    <?php
}

// Halaman order
if (isset($_GET['order'])) {
    $produk_id = $_GET['order'];

    // Cari produk
    $result = $conn->query("SELECT * FROM products WHERE id = '$produk_id'");
    $produk = $result->fetch_assoc();

    if (!$produk) {
        die('Produk tidak ditemukan.');
    }

    ?>
    <h1>Order Pulsa - <?php echo $produk['nama_produk']; ?></h1>
    <form action="index.php" method="POST">
        <label>Nomor HP:</label>
        <input type="text" name="nomor_hp" required><br><br>

        <input type="hidden" name="produk_id" value="<?php echo $produk['id']; ?>">
        <button type="submit">Lanjutkan Pembayaran</button>
    </form>
    <?php
}

// Menangani pembuatan order dan cek stok
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

    // Redirect ke halaman QRIS
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
    echo "<a href='index.php?cek_baya_
    
