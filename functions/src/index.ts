import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

import { addProductIdToProductFunction } from "./sub_functions/addProductIdToProductFunction";
import { createUserFunction } from "./sub_functions/createUserFunction";
import { getFullProductFunction } from "./sub_functions/getFullProductFunction";

export const addProductIdToProduct = functions.firestore
  .document("products/{productId}")
  .onWrite(addProductIdToProductFunction);

export const createUser = functions.auth.user().onCreate(createUserFunction);

export const getFullProduct = functions.https.onCall(getFullProductFunction);
