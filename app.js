// Kurangi stok saat pembayaran
async function reduceStock(productCode) {
  const productRef = db.collection('products').doc(productCode);
  
  return db.runTransaction(async (transaction) => {
    const doc = await transaction.get(productRef);
    if (!doc.exists || doc.data().stock <= 0) {
      throw new Error('Stok habis!');
    }
    transaction.update(productRef, { stock: doc.data().stock - 1 });
    return true;
  });
}

// Contoh pemanggilan saat konfirmasi pembayaran
document.getElementById('konfirmasiBayar').addEventListener('click', async () => {
  const productCode = 'RES60'; // Ambil dari form
  
  try {
    await reduceStock(productCode);
    alert('Pembayaran berhasil! Stok terupdate.');
  } catch (error) {
    alert(`Gagal: ${error.message}`);
  }
});