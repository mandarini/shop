import * as admin from "firebase-admin";

import { UserRecord } from "firebase-functions/lib/providers/auth";

const db = admin.firestore();

export interface UserCommentAsSaved {
  user_email: string;
  text: string;
  title: string;
  date: string;
}

export interface UserComment {
  user: {
    displayName: string;
    photoURL: string;
  };
  text: string;
  title: string;
  date: string;
}

export interface FullProduct {
  uid?: string;
  name: string;
  title: string;
  description: string;
  price: number;
  rating?: number;
  img?: string;
  comments: UserComment[];
}

export interface RequestComments {
  product_id: string;
}

export async function getFullProductFunction(
  data: RequestComments,
  context: any
) {
  let returning_Obj: FullProduct[];
  let product = await db
    .collection("products")
    .doc(data.product_id)
    .get();
  let comments_snap = await db
    .collection("products")
    .doc(data.product_id)
    .collection("comments")
    .get();
  comments_snap.forEach(async comment_snap => {
    if (comment_snap.exists && comment_snap.data()) {
      console.log("argument_inchunks_snap.id", comment_snap.id);
      let comment_saved: UserCommentAsSaved = comment_snap.data()
        ? (comment_snap.data() as UserCommentAsSaved)
        : ({} as UserCommentAsSaved);
      let comment_result: UserComment = {
        text: comment_saved.text,
        title: comment_saved.title,
        date: comment_saved.date,
        user: {
          displayName: "anonymous",
          photoURL: ""
        }
      };

      try {
        let commenter_info: UserRecord = await admin
          .auth()
          .getUserByEmail(comment_saved.user_email);
        comment_result.user.displayName = commenter_info.displayName
          ? commenter_info.displayName
          : commenter_info.email
          ? commenter_info.email
          : "anonymous";
        comment_result.user.photoURL = commenter_info.photoURL
          ? commenter_info.photoURL
          : "";
      } catch (error) {
        console.log(error);
      }
    }
  });
}
