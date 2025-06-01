const admin = require("firebase-admin");
const path = require("path");

let initialized = false;

if (!initialized) {
  const serviceAccount = require(path.resolve(__dirname, "../serviceAccountKey.json"));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kinarcell-c4906-default-rtdb.firebaseio.com",
  });
  initialized = true;
}

const db = admin.database();

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Only POST allowed" };
  }

  const body = JSON.parse(event.body || "{}");
  const message = body.message?.toLowerCase();
  const sender = body.sender;

  if (!message || !sender) {
    return { statusCode: 400, body: "Missing data" };
  }

  const match = message.match(/trx\d{6,}/i);
  if (message.includes("sukses") && match) {
    const trxId = match[0].toUpperCase();

    const riwayatRef = db.ref("riwayat");
    const snapshot = await riwayatRef.once("value");

    snapshot.forEach((child) => {
      const data = child.val();
      if (data.id_transaksi === trxId) {
        child.ref.update({ status: "sukses" });
      }
    });

    return { statusCode: 200, body: `Transaksi ${trxId} diupdate jadi sukses` };
  }

  return { statusCode: 200, body: "No action taken" };
};