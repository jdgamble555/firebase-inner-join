import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { readable } from "svelte/store";

export const addComment = async (message: string) => {

    if (!auth.currentUser) {
        throw 'Not logged in!';
    }

    await addDoc(collection(db, 'comments'), {
        message,
        postId: 'test-post-id',
        createdBy: {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName
        },
        createdAt: serverTimestamp()
    });
};

export const useComments = (postId: string) => {
    return readable<CommentType[]>([], set => {
        return onSnapshot(
            query(
                collection(db, 'comments'),
                where('postId', '==', postId),
                orderBy('createdAt', 'desc')
            ),
            (snap) => {
                if (snap.empty) {
                    set([]);
                    return;
                }
                const comments = snap.docs.map(doc => doc.data({
                    serverTimestamps: 'estimate'
                })) as CommentType[];
                set(comments);
            }
        );
    });
};

export const deleteComment = async (id: string) => {
    await deleteDoc(doc(db, 'comments', id));
};