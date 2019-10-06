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

export interface InitialProduct {
  uid?: string;
  name: string;
  title: string;
  description: string;
  price: number;
  rating?: number;
  img?: string;
}

export interface RequestComments {
  product_id: string;
}

export async function getFullProductFunction(
  data: RequestComments,
  context: any
) {
  let returning_Obj: FullProduct;
  try {
    const product = await db
      .collection("products")
      .doc(data.product_id)
      .get();
    returning_Obj = product.data()
      ? { ...(product.data() as InitialProduct), comments: [] }
      : ({} as FullProduct);
    try {
      const comments_snap = await db
        .collection("products")
        .doc(data.product_id)
        .collection("comments")
        .get();
      const res_promises = comments_snap.docs.map(async comment_snap => {
        const new_comment: UserComment | boolean = await constructUserComment(
          comment_snap
        );
        return new_comment;
      });
      const results = await Promise.all(res_promises);
      for (let i = 0; i < results.length; i++) {
        returning_Obj.comments.push(results[i] as UserComment);
      }
      return returning_Obj;
    } catch (error) {
      console.log("no comments", error, returning_Obj);
      return returning_Obj;
    }
  } catch (error) {
    console.log("product does not exist", error);
    return false;
  }
}

async function constructUserComment(
  comment_snap: FirebaseFirestore.QueryDocumentSnapshot
): Promise<UserComment | boolean> {
  const comment_saved: UserCommentAsSaved = comment_snap.data()
    ? (comment_snap.data() as UserCommentAsSaved)
    : ({} as UserCommentAsSaved);
  const comment_result: UserComment = {
    text: comment_saved.text,
    title: comment_saved.title,
    date: comment_saved.date,
    user: {
      displayName: "anonymous",
      photoURL: ""
    }
  };
  try {
    const commenter_info: UserRecord = await admin
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
    return comment_result;
  } catch (error) {
    console.log("user error", error);
    return comment_result;
  }
}
