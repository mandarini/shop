import * as admin from "firebase-admin";

const db = admin.firestore();

export async function notifyUsersFunction(change: any, context: any) {
  const data = change.after.data();

  /**
   * Find user display name
   * and on click send user to product page
   */

  const payload = {
    notification: {
      title: `New comment!`,
      body: `New comment posted by ${data.user_email}`,
      click_action: "https://shop-katers.web.app/"
    }
  };

  const tokens_snapshot = await db.collection("fcmTokens").get();
  const res_promises = tokens_snapshot.docs.map(async token_snap => {
    const response = await sendMessage(token_snap, payload);
    return response;
  });

  const message_responses = await Promise.all(res_promises);
  for (let i = 0; i < message_responses.length; i++) {
    if (
      message_responses[i] &&
      message_responses[i]["message_response"] &&
      message_responses[i]["message_response"]["results"] &&
      message_responses[i]["message_response"]["token_id"]
    ) {
      message_responses[i]["message_response"]["results"].forEach(
        async (result: any, index: any) => {
          const error = result.error;
          if (error) {
            console.error(
              "Failure sending notification to",
              message_responses[i]["token_id"],
              error
            );
            // Cleanup the tokens who are not registered anymore.
            if (
              error.code === "messaging/invalid-registration-token" ||
              error.code === "messaging/registration-token-not-registered"
            ) {
              try {
                await db
                  .collection("fcmTokens")
                  .doc(message_responses[i]["token_id"])
                  .delete();
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      );
    }
  }
}

async function sendMessage(
  token_snap: FirebaseFirestore.QueryDocumentSnapshot,
  payload: {}
): Promise<any> {
  try {
    const message_response = await admin
      .messaging()
      .sendToDevice(
        token_snap ? (token_snap.id ? token_snap.id : "") : "",
        payload
      );
    return { message_response: message_response, token_id: token_snap.id };
  } catch (error) {
    console.log("user error", error);
    return false;
  }
}
