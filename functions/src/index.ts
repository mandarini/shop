import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

import { addProductIdToProductFunction } from "./sub_functions/addProductIdToProductFunction";

export const addProductIdToProduct = functions.firestore
  .document("products/{productId}")
  .onWrite(addProductIdToProductFunction);
