// firestore functions

import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export type Post = {
  id: string;
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
};

const posts = collection(db, "posts");
const favorites = collection(db, "favorites");

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

async function getFavorite(userId: string, startAfterDoc?: DocumentSnapshot) {
  const favoritesRef = collection(db, "favorites");

  const q = startAfterDoc
    ? query(
        favoritesRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(10),
        startAfter(startAfterDoc)
      )
    : query(
        favoritesRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(10)
      );

  const snapshot = await getDocs(q);

  const posts: Post[] = [];
  for (const favoriteDoc of snapshot.docs) {
    const { postId } = favoriteDoc.data();
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data() as Omit<Post, "id">;
      posts.push({ id: postSnap.id, ...postData });
    }
  }

  const lastDoc = snapshot.docs[snapshot.docs.length - 1];
  return { posts, lastDoc };
}

export async function addFavorite(postId: string, userId: string) {
  await addDoc(favorites, {
    postId,
    userId,
    createdAt: new Date(),
  });
}

export default {
  addPost,
  getPost,
  addFavorite,
  getFavorite,
};
