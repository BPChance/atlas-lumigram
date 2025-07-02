// firestore functions

import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

export type Post = {
  id: string;
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
};

const posts = collection(db, "posts");

async function addPost(post: Post) {
  await addDoc(posts, post);
}

async function getPost(startAfterDoc?: DocumentSnapshot) {
  const postsRef = collection(db, "posts");

  const q = startAfterDoc
    ? query(
        postsRef,
        orderBy("createdAt", "desc"),
        limit(10),
        startAfter(startAfterDoc)
      )
    : query(postsRef, orderBy("createdAt", "desc"), limit(10));

  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Post, "id">;
    return { id: doc.id, ...data };
  });

  const lastDoc = snapshot.docs[snapshot.docs.length - 1];

  return { posts, lastDoc };
}

export default {
  addPost,
  getPost,
};
