import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

import { addProductIdToProductFunction } from "./sub_functions/addProductIdToProductFunction";
import { createUserFunction } from "./sub_functions/createUserFunction";
import { getFullProductFunction } from "./sub_functions/getFullProductFunction";
import { notifyUsersFunction } from "./sub_functions/notifyUsersFunction";
import { notifyUsersFirstTimeFunction } from "./sub_functions/notifyUsersFirstTimeFunction";
import { scheduledBackupFunction } from "./sub_functions/scheduledBackupFunction";

export const addProductIdToProduct = functions.firestore
  .document("products/{productId}")
  .onWrite(addProductIdToProductFunction);

export const createUser = functions.auth.user().onCreate(createUserFunction);

export const getFullProduct = functions.https.onCall(getFullProductFunction);

export const notifyUsers = functions.firestore
  .document("products/{productId}/comments/{commentId}")
  .onWrite(notifyUsersFunction);

export const notifyUsersFistTime = functions.firestore
  .document("fcmTokens/{tokenId}")
  .onWrite(notifyUsersFirstTimeFunction);

export const scheduledBackup = functions.pubsub
  .schedule("every 24 hours")
  .onRun(scheduledBackupFunction);
