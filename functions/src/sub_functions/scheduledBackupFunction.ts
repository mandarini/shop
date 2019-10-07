import * as admin from "firebase-admin";

const client = new admin.firestore.v1.FirestoreAdminClient();

const bucket = "gs://shop-katerina.appspot.com";

export function scheduledBackupFunction(context: any) {
  const databaseName = client.databasePath(
    process.env.GCP_PROJECT,
    "(default)"
  );

  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: bucket,
      // Leave collectionIds empty to export all collections
      // or set to a list of collection IDs to export,
      collectionIds: []
    })
    .then((responses: any[]) => {
      const response = responses[0];
      console.log(`Operation Name: ${response["name"]}`);
      return response;
    })
    .catch((err: any) => {
      console.error(err);
      throw new Error("Export operation failed");
    });
}
