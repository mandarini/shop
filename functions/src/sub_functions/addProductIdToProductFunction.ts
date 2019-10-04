import * as admin from "firebase-admin";

const db = admin.firestore();

export async function addProductIdToProductFunction(change: any, context: any) {
  console.log(context.params);
  try {
    await db
      .collection("products")
      .doc(context.params.productId)
      .update({ uid: context.params.productId });
    console.log("Done!");
  } catch (error) {
    console.log("There was an error.", error);
  }
}
