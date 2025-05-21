
            // [FUNGSI] Filter Area Table
document.getElementById('searchInput').addEventListener('input', function() {
                let filter = this.value.toLowerCase();
                let table = document.getElementById('areaTable');
                let tr = table.getElementsByTagName('tr');
    
                for (let i = 1; i < tr.length; i++) {
                    let tdProvince = tr[i].getElementsByTagName('td')[0];
                    let tdCity = tr[i].getElementsByTagName('td')[1];
                    let tdArea = tr[i].getElementsByTagName('td')[2];
    
                    if (tdProvince || tdCity || tdArea) {
                        let textValueProvince = tdProvince ? tdProvince.textContent || tdProvince.innerText : '';
                        let textValueCity = tdCity ? tdCity.textContent || tdCity.innerText : '';
                        let textValueArea = tdArea ? tdArea.textContent || tdArea.innerText : '';
    
                        if (textValueProvince.toLowerCase().indexOf(filter) > -1 || textValueCity.toLowerCase().indexOf(filter) > -1 || textValueArea.toLowerCase().indexOf(filter) > -1) {
                            tr[i].style.display = '';
                        } else {
                            tr[i].style.display = 'none';
                        }
                    }
                }
            });
    let hargaSetelahDiskon = null;

    $(document).ready(function () {
      const imgbbAPIKey = "a6c2f0d684f4cf1a8df418676c29eac3";
    
    $(document).ready(function() {
});
    
      // [FUNGSI] Tampilkan Detail Paket & Total Bayar
$("#product").on("change", function() {
        const index = $(this).prop("selectedIndex") - 1;
        
        if (index < 0) {
          // Jika tidak ada yang dipilih, sembunyikan
          $("#detailPaketContainer, #totalBayarContainer").addClass('d-none');
          $("#description").val(""); // Kosongkan textarea
        } else {
          // Tampilkan detail paket
          $("#detailPaketContainer").removeClass('d-none');
         $("#description").text(descriptions[index]);
          // Tampilkan total bayar
          const val = $(this).val();
          const match = val.match(/Rp\.\s?([\d.]+)/);
          if (match) {
            const total = parseInt(match[1].replace(/\./g, ""));
            const formatted = new Intl.NumberFormat('id-ID', { 
              style: 'currency', 
              currency: 'IDR' 
            }).format(total);
            $("#totalBayar").text("Total Bayar: " + formatted);
            $("#totalBayarContainer").removeClass('d-none');
          }
        }
      });
    });
    
      // [FUNGSI] QRIS Pembayaran & Modal
$("#bayarQris").click(function () {
        const phone = $("#phone").val();
        const product = $("#product").val();
        const match = product.match(/Rp\.\s?([\d.]+)/);
        let harga = hargaSetelahDiskon ?? (match ? parseInt(match[1].replace(/\./g, '')) : 0);


    
        if (!phone || !product) {
          alert("Silakan isi nomor dan pilih kuota.");
          return;
        }
    
        const kodeUnik = Math.floor(400 + Math.random() * 900);
        const hargaTotal = harga + kodeUnik;
        const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(hargaTotal);
    
        $("#qrisProduct").text(product);
        $("#qrisTotal").text("Total: " + formatted);
        let harga = hargaSetelahDiskon ?? (match ? parseInt(match[1].replace(/\./g, '')) : 0);
const kodeUnik = Math.floor(400 + Math.random() * 900);
const hargaTotal = harga + kodeUnik;
const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(hargaTotal);

        $("#qrisTotal").data("hargaTotal", hargaTotal);
    
        $('#modalQris').modal('show');
      });
    
      // [FUNGSI] Upload Gambar ke ImgBB
function uploadImageToImgbb(file, onSuccess, onError) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64Image = reader.result.split(',')[1];
          $.ajax({
            url: `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
            method: "POST",
            data: { image: base64Image },
            xhr: function() {
              const xhr = new window.XMLHttpRequest();
              xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                  const percentComplete = Math.round((evt.loaded / evt.total) * 100);
                  $("#progressWrapper").show();
                  $("#uploadProgressBar").css("width", percentComplete + "%").text(percentComplete + "%");
                }
              }, false);
              return xhr;
            },
            success: function(response) {
              $("#progressWrapper").hide();
              onSuccess(response.data.url);
            },
            error: function(error) {
              $("#progressWrapper").hide();
              onError(error);
            }
          });
        };
      }
    
    });
    
    // Inisialisasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAm9pbEAyp7iEwlAStQnJPzVwIV23xOsMg",
  authDomain: "toko-kuota-stok.firebaseapp.com",
  databaseURL: "https://toko-kuota-stok-default-rtdb.firebaseio.com",
  projectId: "toko-kuota-stok",
  storageBucket: "toko-kuota-stok.firebasestorage.app",
  messagingSenderId: "321145437639",
  appId: "1:321145437639:web:21c425d46679158e376de2",
  measurementId: "G-PD9BGY36G1"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// [FUNGSI] Ambil Kode Produk dari Select
function getKodeProduk() {
  const select = document.getElementById("product");
  const selectedOption = select.options[select.selectedIndex];
  return selectedOption ? selectedOption.value.split(" ")[0].trim() : null;
}

// [FUNGSI] Kurangi Stok di Firebase
function kurangiStok(kode) {
  const stokRef = db.ref("stok/" + kode);
  stokRef.transaction(current => {
    if (current > 0) {
      return current - 1;
    } else {
      alert("Stok habis!");
      return;
    }
  }, (error, committed, snapshot) => {
    if (error) {
      alert("Gagal memperbarui stok.");
    } else if (!committed) {
      alert("Pesanan dibatalkan karena stok kosong.");
    } else {
      alert("Pesanan berhasil. Sisa stok: " + snapshot.val());
    }
  });
}

// [FUNGSI] Handler Upload dan Stok
function handleUploadClick(buttonId, inputId) {
  const btn = document.getElementById(buttonId);
  const fileInput = document.getElementById(inputId);

  if (btn && fileInput) {
    btn.addEventListener("click", () => {
      if (!fileInput.files.length) {
        alert("Silakan unggah bukti pembayaran terlebih dahulu.");
        return;
      }

      const kode = getKodeProduk();
      
      if (kode) kurangiStok(kode);

      // Simpan riwayat ke Firebase
      const phone = document.getElementById("phone").value;
      const product = document.getElementById("product").value;
      const metode = document.getElementById("metodePembayaran").value;
      const harga = $("#qrisTotal").data("hargaTotal") || 0;

      db.ref("riwayat").push({
        status: "on proses",
  phone,
        product,
        metode,
        harga,
        timestamp: Date.now()
      });

    });
  }
}

// Jalankan saat dokumen siap
document.addEventListener("DOMContentLoaded", () => {
  // Cek stok dan disable opsi jika habis
  const select = document.getElementById("product");
  db.ref("stok").once("value").then(snapshot => {
    const stokData = snapshot.val();
    for (let option of select.options) {
      const kode = option.value.split(" ")[0];
      if (stokData && stokData[kode] !== undefined) {
        const jumlah = stokData[kode];
        if (jumlah <= 0) {
          option.disabled = true;
          option.text += " (HABIS)";
        } else {
          option.text += ` (Stok: ${jumlah})`;
        }
      }
    }
  });

  // Tombol cek stok manual
  document.getElementById("cekStokBtn").addEventListener("click", () => {
    db.ref("stok").once("value").then(snapshot => {
      const stokData = snapshot.val();
      if (!stokData) {
        alert("Stok tidak ditemukan.");
        return;
      }

      let message = "Stok Tersedia:\n";
      for (const [kode, jumlah] of Object.entries(stokData)) {
        message += `${kode}: ${jumlah}\n`;
      }
      alert(message);
    }).catch(error => {
      console.error("Gagal mengambil data stok:", error);
      alert("Gagal mengambil data stok.");
    });
  });

  // Hubungkan tombol dengan fungsi pengurangan stok
  handleUploadClick("konfirmasiBayarQris", "buktiBayar");
  handleUploadClick("konfirmasiBayarBank", "buktiBayarBank");
  handleUploadClick("konfirmasiBayarEwallet", "buktiBayarEwallet");
});

    // Deklarasikan variabel countdown di scope global
    let qrisTimer;
    let countdownInterval;
    let countdownDisplay;
    
    $(document).ready(function() {
      // Inisialisasi elemen countdown
      countdownDisplay = document.getElementById('countdownTimer');
      
      // Fungsi startCountdown khusus untuk QRIS
      function startQrisCountdown(minutes) {
        let time = minutes * 60;
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
          const mins = Math.floor(time / 60);
          const secs = time % 60;
          if(countdownDisplay) {
            countdownDisplay.textContent = `Sisa Waktu Pembayaran: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
          }
          if (time > 0) {
            time--;
          } else {
            clearInterval(countdownInterval);
            $('#modalQris').modal('hide');
            alert("Waktu pembayaran habis, silakan ulangi pemesanan.");
          }
        }, 1000);
      }
    
      // Saat tombol Bayar QRIS diklik
      $('#bayarQris').click(function() {
        clearTimeout(qrisTimer);
        clearInterval(countdownInterval);
        startQrisCountdown(5); // 5 menit countdown
        qrisTimer = setTimeout(() => {
          $('#modalQris').modal('hide');
          alert("Waktu pembayaran habis, silakan ulangi pemesanan.");
        }, 5 * 60 * 1000);
      });
    
      // Saat modal QRIS ditutup
      $('#modalQris').on('hidden.bs.modal', function() {
        clearTimeout(qrisTimer);
        clearInterval(countdownInterval);
      });
    });
    
    $(document).ready(function() {
      // Inisialisasi elemen countdown
      countdownDisplay = document.getElementById('countdownBank');
      
      // Fungsi startCountdown khusus untuk QRIS
      function startQrisCountdown(minutes) {
        let time = minutes * 60;
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
          const mins = Math.floor(time / 60);
          const secs = time % 60;
          if(countdownDisplay) {
            countdownDisplay.textContent = `Sisa Waktu Pembayaran: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
          }
          if (time > 0) {
            time--;
          } else {
            clearInterval(countdownInterval);
            $('#modalBank').modal('hide');
            alert("Waktu pembayaran habis, silakan ulangi pemesanan.");
          }
        }, 1000);
      }
    
      // Saat tombol Bayar QRIS diklik
      $('#bayarQris').click(function() {
        clearTimeout(qrisTimer);
        clearInterval(countdownInterval);
        startQrisCountdown(5); // 5 menit countdown
        qrisTimer = setTimeout(() => {
          $('#modalBank').modal('hide');
          alert("Waktu pembayaran habis, silakan ulangi pemesanan.");
        }, 5 * 60 * 1000);
      });
    
      // Saat modal QRIS ditutup
      $('#modalQris').on('hidden.bs.modal', function() {
        clearTimeout(qrisTimer);
        clearInterval(countdownInterval);
      });
    });
    
    // Inisialisasi tombol Bayar QRIS
    updateStokInfo();
    
        // Fungsi untuk mengurangi stok di Firebase
    // [FUNGSI] Kurangi Stok di Firebase
function kurangiStok(kodeProduk) {
      const stokRef = db.ref(`stok/${kodeProduk}`);
      
      stokRef.transaction((currentStok) => {
        if (currentStok === null || currentStok === undefined) return currentStok;
        if (currentStok <= 0) {
          alert("Stok produk ini sudah habis!");
          return currentStok;
        }
        return currentStok - 1;
      }).then(() => {
        console.log(`Stok ${kodeProduk} berhasil dikurangi`);
      }).catch((error) => {
        console.error("Gagal mengurangi stok:", error);
      });
    }

    // [FUNGSI] Ambil Kode Produk dari Select
function getKodeProduk() {
      const select = document.getElementById("product");
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption) {
        return selectedOption.value.split("|")[0].trim();
      }
      return null;
    }

  document.getElementById("btnBayar").addEventListener("click", function () {
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;
    const metode = document.getElementById("metodePembayaran").value;

    if (!phone || !product || !metode) {
      $('#isiFormModal').modal('show');
      return;
    }

    // Arahkan ke modal pembayaran sesuai metode
    if (metode === "qris") {
      $("#qrisProduct").text(product);
      $("#qrisTotal").text("" + $("#totalBayar").text().replace("Total Bayar: ", ""));
      $('#modalQris').modal('show');
    } else if (metode === "bank") {
      $("#bankProduct").text(product);
      $("#bankTotal").text("" + $("#totalBayar").text().replace("Total Bayar: ", ""));
      $('#modalBank').modal('show');
    } else if (metode === "ewallet") {
      $("#ewalletProduct").text(product);
      $("#ewalletTotal").text("" + $("#totalBayar").text().replace("Total Bayar: ", ""));
      $('#modalEwallet').modal('show');
    }
  });

    $(document).ready(function () {
    $('#btnBayar').click(function () {
      const metode = $('#metodePembayaran').val();
      const phone = $('#phone').val();
      const product = $('#product').val();
      const match = product.match(/Rp\.\s?([\d.]+)/);
      const harga = match ? parseInt(match[1].replace(/\./g, '')) : 0;
    
      if (!phone || !product || !metode) {
        alert("Silakan isi nomor HP, pilih kuota, dan metode pembayaran.");
        return;
      }
    
      const kodeUnik = Math.floor(400 + Math.random() * 900);
      const hargaTotal = harga + kodeUnik;
      const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(hargaTotal);
    
      if (metode === "qris") {
          let harga = hargaSetelahDiskon ?? (match ? parseInt(match[1].replace(/\./g, '')) : 0);
const kodeUnik = Math.floor(400 + Math.random() * 900);
const hargaTotal = harga + kodeUnik;
const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(hargaTotal);
        $('#qrisProduct').text(product);
        $('#qrisTotal').text("Total: " + formatted);
        $('#qrisTotal').data("hargaTotal", hargaTotal);
        $('#modalQris').modal('show');
    
        
      } else if (metode === "bank") {
  let harga = hargaSetelahDiskon ?? (match ? parseInt(match[1].replace(/\./g, '')) : 0);
  const kodeUnik = Math.floor(0 + Math.random() * 0);
  const hargaTotal = harga + kodeUnik;
  const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(hargaTotal);
  
  $("#bankProduct").text(product);
  $("#modalBank .text-primary").text("Total: " + formatted);
  $("#modalBank .text-primary").data("hargaTotal", hargaTotal); // Simpan nilai untuk WhatsApp
  
        $('#modalBank').modal('show');
      } else if (metode === "ewallet") {
let harga = hargaSetelahDiskon ?? (match ? parseInt(match[1].replace(/\./g, '')) : 0);
  const kodeUnik = Math.floor(0 + Math.random() * 0);
const hargaTotal = harga + kodeUnik;
const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(hargaTotal);
$("#ewalletProduct").text(product);
$("#ewalletTotal").text("Total: " + formatted);

        $('#modalEwallet').modal('show');
      }
    });
    
    });
    
    function startCountdown(targetId, modalId) {
      let duration = 300;
      const display = document.getElementById(targetId);
      const interval = setInterval(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        display.textContent = `Sisa Waktu Pembayaran: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (--duration < 0) {
          clearInterval(interval);
          $(modalId).modal('hide');
          alert("Waktu pembayaran habis. Silakan ulangi.");
        }
      }, 1000);
    }
    
    function handleUpload(fileInput, progressWrapper, progressBar, callback) {
      const file = $(fileInput)[0].files[0];
      if (!file) {
        alert("Silakan upload bukti pembayaran.");
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        const base64Image = reader.result.split(',')[1];
        $.ajax({
          url: 'https://api.imgbb.com/1/upload?key=a6c2f0d684f4cf1a8df418676c29eac3',
          method: 'POST',
          data: { image: base64Image },
          xhr: function () {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (e) {
              if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                $(progressWrapper).show();
                $(progressBar).css('width', percent + '%').text(percent + '%');
              }
            });
            return xhr;
          },
          success: function (res) {
            $(progressWrapper).hide();
            callback(res.data.url);
          },
          error: function () {
            $(progressWrapper).hide();
            alert("Gagal upload gambar.");
          }
        });
      };
      reader.readAsDataURL(file);
    }
    
    $(document).ready(function () {
        
      $('#modalBank').on('shown.bs.modal', () => startCountdown('countdownBank', '#modalBank'));
      $('#modalEwallet').on('shown.bs.modal', () => startCountdown('countdownEwallet', '#modalEwallet'));
      $('#modalQris').on('shown.bs.modal', () => startCountdown('countdownTimer', '#modalQris'));
     
      // Untuk QRIS
      $('#konfirmasiBayarQris').click(function () {
        const phone = $('#phone').val();
        const product = $('#product').val();
        const total = $('#qrisTotal').text().replace('Total: ', '');
        const description = $("#description").text();
        
        handleUpload('#buktiBayar', '#progressWrapper', '#uploadProgressBar', function (url) {
          // Format pesan WhatsApp
          const pesan = `*KONFIRMASI PEMBAYARAN QRIS*\n\n` +
                       `📱 *Nomor HP:* ${phone}\n\n` +
                       `📦 *Paket Yang Dibeli:* ${product}\n\n` +
                       `📝 *Detail Paket:*\n${description.replace(/\n/g, '\n')}\n\n` +
                       `💳 *Total Pembayaran:* ${total}\n` +
                       `📎 *Bukti Pembayaran:* ${url}\n\n` +
                       `Mohon konfirmasi penerimaan dan proses pesanan ini. Terima kasih.`;
          
          // Tampilkan modal sukses
          $('#successMessage').html(`
            <p>Pembayaran Anda telah berhasil dikonfirmasi dengan rincian:</p>
            <div class="alert alert-light text-left">
              <strong>Nomor HP:</strong> ${phone}<br>
              <strong>Paket:</strong> ${product}<br>
              <strong>Total:</strong> ${total}
            </div>
          
          `);
          
          // Update tombol WhatsApp
          $('#whatsappCSBtn').off('click').on('click', function() {
            window.open(`https://wa.me/6283842915722?text=${encodeURIComponent(pesan)}`, '_blank');
          });
          
          $('#modalQris').modal('hide');
          $('#successModal').modal('show');
        });
      });
    
      // Untuk Bank Transfer
      $('#konfirmasiBayarBank').click(function () {
      const phone = $('#phone').val();
      const product = $('#product').val();
      const total = $('#bankTotal').text().replace('Total: ', '');
      const description = $("#description").text();
      
      handleUpload('#buktiBayarBank', '#progressWrapperBank', '#uploadProgressBarBank', function (url) {
        // Format pesan WhatsApp
        const pesan = `*KONFIRMASI PEMBAYARAN BANK*\n\n` +
             `📱 *Nomor HP:* ${phone}\n` +
             `📦 *Paket Yang Dibeli:* ${product}\n\n` +
             `📝 *Detail Paket:*\n${description.replace(/\n/g, '\n')}\n\n` +
             `💳 *Total Pembayaran:* ${total}\n` +  // Tambahkan total
             `📎 *Bukti Pembayaran:* ${url}\n\n` +
             `Mohon konfirmasi penerimaan dan proses pesanan ini. Terima kasih.`;
        
          
          // Tampilkan modal sukses
          $('#successMessage').html(`
            <p>Pembayaran Anda telah berhasil dikonfirmasi dengan rincian:</p>
            <div class="alert alert-light text-left">
              <strong>Nomor HP:</strong> ${phone}<br>
              <strong>Paket:</strong> ${product}<br>
              <strong>Total:</strong> ${total}
            </div>
            
          `);
          
          // Update tombol WhatsApp
          $('#whatsappCSBtn').off('click').on('click', function() {
            window.open(`https://wa.me/6283842915722?text=${encodeURIComponent(pesan)}`, '_blank');
          });
          
          $('#modalBank').modal('hide');
          $('#successModal').modal('show');
        });
      });
    
      // Untuk E-Wallet
      $('#konfirmasiBayarEwallet').click(function () {
        const phone = $('#phone').val();
        const product = $('#product').val();
        const total = $('#ewalletTotal').text().replace('Total: ', '');
        const description = $("#description").text();
        
        handleUpload('#buktiBayarEwallet', '#progressWrapperEwallet', '#uploadProgressBarEwallet', function (url) {
          // Format pesan WhatsApp
          const pesan = `*KONFIRMASI PEMBAYARAN E-WALLET*\n\n` +
                       `📱 *Nomor HP:* ${phone}\n\n` +
                       `📦 *Paket Yang Dibeli:* ${product}\n\n` +
                       `📝 *Detail Paket:*\n${description.replace(/\n/g, '\n')}\n\n` +
                       `💳 *Total Pembayaran:* ${total}\n` +
                       `📎 *Bukti Pembayaran:* ${url}\n\n` +
                       `Mohon konfirmasi penerimaan dan proses pesanan ini. Terima kasih.`;
          
          // Tampilkan modal sukses
          $('#successMessage').html(`
            <p>Pembayaran Anda telah berhasil dikonfirmasi dengan rincian:</p>
            <div class="alert alert-light text-left">
              <strong>Nomor HP:</strong> ${phone}<br>
              <strong>Paket:</strong> ${product}<br>
              <strong>Total:</strong> ${total}
            </div>
           
          `);
          
          // Update tombol WhatsApp
          $('#whatsappCSBtn').off('click').on('click', function() {
            window.open(`https://wa.me/6283842915722?text=${encodeURIComponent(pesan)}`, '_blank');
          });
          
          $('#modalEwallet').modal('hide');
          $('#successModal').modal('show');
        });
      });
    });
    $('#konfirmasiBayarBank').click(function () {
      const phone = $('#phone').val();
      const product = $('#product').val();
      const total = $('#bankTotal').text().replace('Total: ', '');
      const description = $("#description").text();
      
      handleUpload('#buktiBayarBank', '#progressWrapperBank', '#uploadProgressBarBank', function (url) {
        // Format pesan WhatsApp
        const pesan = `*KONFIRMASI PEMBAYARAN BANK*\n\n` +
                     `📱 *Nomor HP:* ${phone}\n` +
                     `📦 *Paket Yang Dibeli:* ${product}\n\n` +
                     `📝 *Detail Paket:*\n${description.replace(/\n/g, '\n')}\n\n` +
                     `💳 *Total Pembayaran:* ${total}\n` +
                     `📎 *Bukti Pembayaran:* ${url}\n\n` +
                     `Mohon konfirmasi penerimaan dan proses pesanan ini. Terima kasih.`;
        
        // Tampilkan modal sukses
        $('#successMessage').html(`
          <p>Pembayaran Anda telah berhasil dikonfirmasi dengan rincian:</p>
          <div class="alert alert-light text-left">
            <strong>Nomor HP:</strong> ${phone}<br>
            <strong>Paket:</strong> ${product}<br>
            <strong>Total:</strong> ${total}
          </div>
          
        `);
        
        // Update tombol WhatsApp
        $('#whatsappCSBtn').off('click').on('click', function() {
          window.open(`https://wa.me/6283842915722?text=${encodeURIComponent(pesan)}`, '_blank');
        });
        
        $('#modalBank').modal('hide');
        $('#successModal').modal('show');
        
        // Hapus semua kode terkait countdown dan auto-open WhatsApp
      });
    });
    
    $(document).ready(function() {
      // Inisialisasi Select2
      $('.select2').select2({
        theme: 'bootstrap-5',
        width: '100%',
        placeholder: function() {
          return $(this).data('placeholder');
        },
        allowClear: true
      });
    
      // Update handler untuk select product
      // [FUNGSI] Tampilkan Detail Paket & Total Bayar
$("#product").on("change", function() {
        const selectedOption = $(this).find('option:selected');
        const description = selectedOption.data('description') || '';
        
        if (!selectedOption.val()) {
          $("#detailPaketContainer, #totalBayarContainer").addClass('d-none');
          $("#description").val("");
        } else {
          $("#detailPaketContainer").removeClass('d-none');
          $("#description").val(description.replace(/\|/g, '\n'));
          
          const val = selectedOption.val();
          const match = val.match(/Rp\.\s?([\d.]+)/);
          if (match) {
            const total = parseInt(match[1].replace(/\./g, ""));
            const formatted = new Intl.NumberFormat('id-ID', { 
              style: 'currency', 
              currency: 'IDR' 
            }).format(total);
            $("#totalBayar").text("Total Bayar: " + formatted);
            $("#totalBayarContainer").removeClass('d-none');
          }
        }
      });
    });
    


    $(document).ready(function() {
      // Format nomor HP otomatis
      $('#phone').on('input', function() {
        let value = $(this).val();
        
        // Hapus semua karakter non-digit
        value = value.replace(/\D/g, '');
        
        // Jika dimulai dengan 62, ganti dengan 0
        if (value.startsWith('62')) {
          value = '0' + value.substring(2);
        }
        // Jika dimulai dengan +62, ganti dengan 0
        else if (value.startsWith('+62')) {
          value = '0' + value.substring(3);
        }
        // Pastikan dimulai dengan 08
        else if (!value.startsWith('08') && value.length > 0) {
          value = '08' + value.substring(value.startsWith('0') ? 1 : 0);
        }
        
        // Batasi panjang maksimal 13 digit (08xxxxxxxxx)
        if (value.length > 13) {
          value = value.substring(0, 13);
        }
        
        $(this).val(value);
      });
    
      // Tampilkan indikator paste saat fokus
      $('#phone').on('focus', function() {
        $(this).next('.paste-indicator').show();
      });
      
      // Sembunyikan indikator paste saat tidak fokus
      $('#phone').on('blur', function() {
        $(this).next('.paste-indicator').hide();
      });
      
      // Sembunyikan indikator paste awalnya
      $('.paste-indicator').hide();
    });
    


    // Add active class to current page
    $(document).ready(function() {
      const currentPage = window.location.pathname.split('/').pop();
      $('.nav-item').removeClass('active');
      
      if(currentPage === 'index.html' || currentPage === '') {
        $('.nav-item:nth-child(1)').addClass('active');
      } else if(currentPage === 'payment.html') {
        $('.nav-item:nth-child(2)').addClass('active');
      } else if(currentPage === 'history.html') {
        $('.nav-item:nth-child(3)').addClass('active');
      } else if(currentPage === 'profile.html') {
        $('.nav-item:nth-child(4)').addClass('active');
      }
    });
    


$(document).ready(function() {
  // Fungsi untuk smooth scroll ke element
  function scrollToElement(selector, offset = 20) {
    $('html, body').animate({
      scrollTop: $(selector).offset().top - offset
    }, 500);
  }

  // Auto-scroll saat fokus ke nomor HP
  $('#phone').on('focus', function() {
    scrollToElement('#phone');
  });

  // Auto-scroll saat memilih kuota
  $('#product').on('select2:select', function() {
    scrollToElement('#metodePembayaran');
    
    // Tampilkan detail paket jika dipilih
    setTimeout(() => {
      $('#detailPaketContainer, #totalBayarContainer').removeClass('d-none');
      scrollToElement('#detailPaketContainer');
    }, 100);
  });

  // Auto-scroll saat memilih metode pembayaran
  $('#metodePembayaran').on('select2:select', function() {
    scrollToElement('#btnBayar');
  });

  // Pertahankan semua fungsi sebelumnya
  let csContacted = false;
  
  function showSuccessModal() {
    csContacted = false;
    $('#successModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#successModal .close').hide();
    $('#successModal .btn-secondary')
      .prop('disabled', true)
      .html('<i class="fa fa-lock"></i> Harap Hubungi CS');
  }

  $('#whatsappCSBtn').off('click').on('click', function() {
    csContacted = true;
    const phone = $('#phone').val();
    const product = $('#product').val();
    const total = $('#totalBayar').text();
    const message = `*KONFIRMASI PEMBELIAN*\n\nNomor: ${phone}\nPaket: ${product}\nTotal: ${total}`;
    window.open(`https://wa.me/6283842915722?text=${encodeURIComponent(message)}`, '_blank');
    $('#successModal').modal('hide');
    setTimeout(() => location.reload(), 500);
    return false;
  });

  $('#testPaymentSuccess').click(showSuccessModal);
});



$(document).ready(function() {
  // Refresh halaman saat modal pembayaran ditutup
  $('#modalQris, #modalBank, #modalEwallet, #successModal').on('hidden.bs.modal', function() {
    setTimeout(function() {
      location.reload();
    }, 100000); // Delay 100 detik sebelum refresh
  });

  // Pertahankan fungsi countdown dan lainnya
  function startCountdown(targetId, modalId) {
    let duration = 300;
    const display = document.getElementById(targetId);
    const interval = setInterval(() => {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      display.textContent = `Sisa Waktu Pembayaran: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      if (--duration < 0) {
        clearInterval(interval);
        $(modalId).modal('hide');
        alert("Waktu pembayaran habis. Silakan ulangi.");
      }
    }, 1000);
  }

  // Fungsi lainnya tetap sama
  // ...
});





  // Blokir shortcut DevTools
  document.onkeydown = function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      return false;
    }
  };

  // Blokir drag teks
  document.addEventListener('dragstart', e => e.preventDefault());

  // Hanya izinkan paste pada input dengan ID "phone"
  document.addEventListener('paste', function (e) {
    const activeElement = document.activeElement;
    if (activeElement.id !== 'phone') {
      e.preventDefault();
    }
  });



  function cekFormKosongDanTampilkanModal() {
    const phone = document.getElementById('phone').value.trim();
    const product = document.getElementById('product').value;
    
    // Jika belum diisi dua-duanya
    if (!phone && !product && !$('#isiFormModal').hasClass('show')) {
      $('#isiFormModal').modal('show');
    }
  }

  // Cek setelah 60 detik pertama
  setTimeout(cekFormKosongDanTampilkanModal, 60000);

  // Cek berulang setiap 120 detik jika form belum diisi
  setInterval(cekFormKosongDanTampilkanModal, 120000);



  const phoneInput = document.getElementById('phone');
  const clearBtn = document.getElementById('clearPhone');

  // Tampilkan atau sembunyikan tombol clear
  phoneInput.addEventListener('input', () => {
    clearBtn.style.display = phoneInput.value ? 'block' : 'none';
  });

  // Bersihkan input saat diklik
  clearBtn.addEventListener('click', () => {
    phoneInput.value = '';
    clearBtn.style.display = 'none';
    phoneInput.focus();
  });



  const phoneInput = document.getElementById('phone');

  // Hanya izinkan angka
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, ''); // hanya angka
  });

  // Validasi saat tombol pembayaran diklik
  document.getElementById('btnBayar').addEventListener('click', function () {
    const phone = phoneInput.value.trim();

    if (phone.length < 9 || phone.length > 13) {
      alert("Nomor HP harus 9–13 digit dan hanya angka.");
      phoneInput.focus();
      return;
    }

    // Jika valid, lanjut proses
    // ... lanjut ke proses pembayaran
  });



    jQuery(document).ready(function($){
$(document).keydown(function(event) {
var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();

if (event.ctrlKey && (pressedKey == "c" || pressedKey == "u")) {
alert('Sorry, This Functionality Has Been Disabled!');
//disable key press porcessing
return false;
}
});
});

document.onkeypress = function (event) {
event = (event || window.event);
if (event.keyCode == 123) {
return false;
}
}
document.onmousedown = function (event) {
event = (event || window.event);
if (event.keyCode == 123) {
return false;
}
}
document.onkeydown = function (event) {
event = (event || window.event);
if (event.keyCode == 123) {
return false;
}
}



    function updateStepper(currentStep) {
  $(".modern-stepper .step").each(function () {
    const stepNum = parseInt($(this).data("step"));
    $(this).removeClass("active completed");
    if (stepNum < currentStep) {
      $(this).addClass("completed");
    } else if (stepNum === currentStep) {
      $(this).addClass("active");
    }
  });
}

// Contoh penggunaan:
$("#btnBayar").click(() => updateStepper(2));
$("#konfirmasiBayarQris, #konfirmasiBayarBank, #konfirmasiBayarEwallet").click(() => updateStepper(3));
$("#successModal").on("shown.bs.modal", () => updateStepper(4));




  // Wajib hubungi cs
  let sudahKlikCS = false;

  document.getElementById("whatsappCSBtn").addEventListener("click", function () {
    sudahKlikCS = true;
    window.open(`https://wa.me/6283842915722?text=${encodeURIComponent(pesan)}`, '_blank');
          });

  // Cegah refresh, tutup tab, atau back
  window.addEventListener("beforeunload", function (e) {
    if (!sudahKlikCS) {
      e.preventDefault();
      e.returnValue = "Silakan klik 'Hubungi CS' terlebih dahulu untuk melanjutkan.";
    }
  });

  // Cegah tombol close pada modal
  $('#successModal').on('hide.bs.modal', function (e) {
    if (!sudahKlikCS) {
      e.preventDefault();
      alert("Silakan klik 'Hubungi CS' terlebih dahulu sebelum menutup.");
      return false;
    }
  });



  const paketSelect = $('#product');
  const descriptionBox = $('#description');
  const detailContainer = $('#detailPaketContainer');
  const totalBayarContainer = $('#totalBayarContainer');
  const totalBayarEl = $('#totalBayar');
  const promoInput = $('#promoCode');
  const promoBtn = $('#applyPromo');
  const promoMsg = $('#promoMessage');

  let paketData = {};
  let stokData = {};
  let promoData = {};
  let selectedHarga = 0;
  let hargaFinal = 0;
  let selectedKodePromo = '';

  $(document).ready(function () {
    Promise.all([
      db.ref('paketKuota').once('value'),
      db.ref('stok').once('value'),
      db.ref('promo').once('value')
    ]).then(([paketSnap, stokSnap, promoSnap]) => {
      paketData = paketSnap.val() || {};
      stokData = stokSnap.val() || {};
      promoData = promoSnap.val() || {};

      const tersedia = [];
      const habis = [];

      for (const kode in paketData) {
        const item = paketData[kode];
        const stok = stokData[kode] ?? item.stok ?? 0;

        if (item.aktif === false) continue;

        const label = `${kode} - ${item.nama || 'Tanpa Nama'} (Stok: ${stok})`;
        const option = `<option value="${kode}">${label}</option>`;
        const optionDisabled = `<option value="${kode}" disabled>${kode} - ${item.nama || 'Tanpa Nama'} (Habis)</option>`;

        if (stok > 0) {
          tersedia.push(option);
        } else {
          habis.push(optionDisabled);
        }
      }

      paketSelect.append([...tersedia, ...habis].join(''));
    });

    paketSelect.on('change', function () {
  const kode = $(this).val();
  const paket = paketData[kode];
  if (paket) {
    descriptionBox.text(paket.deskripsi || 'Tidak ada deskripsi');
    selectedHarga = paket.harga || 0;
    hargaFinal = selectedHarga;
    selectedKodePromo = '';
    kodeUnikQris = 0;

    // Harga normal
    const hargaNormal = `Rp ${selectedHarga.toLocaleString('id-ID')}`;
    totalBayarEl.html(hargaNormal);
    $('#qrisTotal').html(hargaNormal);
    $('#bankTotal').html(hargaNormal);
    $('#ewalletTotal').html(hargaNormal);

    detailContainer.removeClass('d-none');
    totalBayarContainer.removeClass('d-none');
    promoMsg.text('');
    promoInput.val('');
  }
});


    promoBtn.on('click', function () {
  const kodePromo = promoInput.val().trim().toUpperCase();
  const promo = promoData[kodePromo];
  selectedKodePromo = '';
  if (!promo) {
    promoMsg.text('Kode promo tidak ditemukan.').addClass('text-danger').removeClass('text-success text-warning');
    return;
  }

  // ... validasi hari & jam promo

  // Hitung harga setelah promo
  let hargaSetelahPromo = selectedHarga;
  if (promo.tipe === 'diskon_persen') {
    hargaSetelahPromo -= (selectedHarga * promo.nilai / 100);
  } else if (promo.tipe === 'diskon_nominal') {
    hargaSetelahPromo -= promo.nilai;
  }
  hargaFinal = Math.ceil(Math.max(0, hargaSetelahPromo));
  selectedKodePromo = kodePromo;

  // Format harga
  const hargaAwal = `Rp ${selectedHarga.toLocaleString('id-ID')}`;
  const hargaPromo = `Rp ${hargaFinal.toLocaleString('id-ID')}`;
  const hargaHTML = `${hargaPromo}`;

  // Update semua tampilan total harga
  totalBayarEl.html(hargaHTML);
  $('#qrisTotal').html(hargaHTML);
  $('#bankTotal').html(hargaHTML);
  $('#ewalletTotal').html(hargaHTML);

  promoMsg.text('Promo berhasil diterapkan.').addClass('text-success').removeClass('text-danger text-warning');
});

    // Saat klik tombol pembayaran
    $('#btnBayar').on('click', function () {
      const finalHarga = hargaFinal || selectedHarga;
      const promoTeks = (hargaFinal !== selectedHarga && selectedKodePromo)
        ? `<br><small class="text-muted">Promo ${selectedKodePromo}: <del>Rp ${selectedHarga.toLocaleString('id-ID')}</del></small>`
        : '';

      const hargaHTML = `<strong>Total Bayar:</strong> Rp ${finalHarga.toLocaleString('id-ID')}${promoTeks}`;

      $('#qrisTotal, #bankTotal, #ewalletTotal').html(hargaHTML);
    });
  });



function copyToClipboard(elementId, btn) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(function() {
    // Ubah tampilan tombol sementara
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-check text-success"></i> ';
    btn.classList.remove('btn-outline-primary');
    btn.classList.add('btn-success');
    setTimeout(function() {
      btn.innerHTML = original;
      btn.classList.remove('btn-success');
      btn.classList.add('btn-outline-primary');
    }, 1500);
  }, function() {
    alert('Gagal menyalin ke clipboard, Silahkan salin manual.');
  });
}

document.getElementById('pastePhoneBtn').addEventListener('click', function() {
    // Cek apakah browser mendukung Clipboard API
    if (navigator.clipboard) {
        navigator.clipboard.readText().then(function(text) {
            // Hanya ambil angka
            const onlyNumber = text.replace(/[^0-9]/g, '');
            document.getElementById('phone').value = onlyNumber;
            document.getElementById('phone').focus();
            // Tampilkan tombol clear jika ada isian
            
        }).catch(function(err) {
            alert('Gagal mengambil data dari clipboard.');
        });
    } else {
        alert('Fitur paste otomatis tidak didukung browser ini.');
    }
});

