import * as admin from "firebase-admin";

const db = admin.firestore();

export function notifyUsersFunction(change: any, context: any) {
  console.log(context.params.productId);
  const data = change.after.data();

  const payload = {
    notification: {
      title: `New comment!`,
      body: `New comment posted by ${data.user_email}`,
      click_action: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    }
  };
  // Get the list of device tokens.
  return db
    .collection("fcmTokens")
    .get()
    .then(tokens_snapshot => {
      tokens_snapshot.forEach(token => {
        // Send notifications to all tokens.
        return admin
          .messaging()
          .sendToDevice(token.id, payload)
          .then(response => {
            // For each message check if there was an error.
            response.results.forEach((result, index) => {
              const error = result.error;
              if (error) {
                console.error("Failure sending notification to", token, error);
                // Cleanup the tokens who are not registered anymore.
                if (
                  error.code === "messaging/invalid-registration-token" ||
                  error.code === "messaging/registration-token-not-registered"
                ) {
                  db.collection("fcmTokens")
                    .doc(token.id)
                    .delete()
                    .then(res => {
                      console.log("done");
                    })
                    .catch(err => {
                      console.log("error", err);
                    });
                }
              }
            });
          });
      });
    });
}
