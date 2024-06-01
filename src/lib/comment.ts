import {
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { readable } from "svelte/store";

export const addComment = async (message: string) => {

    if (!auth.currentUser) {
        throw 'Not logged in!';
    }

    await addDoc(collection(db, 'comments'), {
        message,
        createdBy: {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL
        },
        createdAt: serverTimestamp()
    });
};

export const useComments = () => {
    return readable<CommentType[]>([], set => {
        return onSnapshot(
            query(
                collection(db, 'comments'),
                orderBy('createdAt', 'desc')
            ),
            (snap) => {
                if (snap.empty) {
                    set([]);
                    return;
                }
                const comments = snap.docs.map(doc => {

                    const data = doc.data({
                        serverTimestamps: 'estimate'
                    });

                    const createdAt = data.createdAt as Timestamp;

                    return {
                        commentId: doc.id,
                        ...data,
                        createdAt: createdAt.toDate()
                    };
                }) as CommentType[];
                set(comments);
            }
        );
    });
};

export const deleteComment = async (id: string) => {
    await deleteDoc(
        doc(db, 'comments', id)
    );
};