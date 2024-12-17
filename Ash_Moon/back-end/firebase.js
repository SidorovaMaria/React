import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Read the serviceAccountKey.json file and parse it
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve("config/serviceAccountKey.json"), "utf8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export default admin;
