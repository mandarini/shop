import * as admin from "firebase-admin";

const db = admin.firestore();

export async function createUserFunction(user: any) {
  try {
    await db
      .collection("users")
      .doc(user.uid)
      .set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    console.log("Done!");
  } catch (error) {
    console.log("There was an error.", error);
  }
}
