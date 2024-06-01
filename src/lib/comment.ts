import {
    Timestamp,
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
import { derived, type Readable } from "svelte/store";
import { useUser } from "./use-user";
import { dev } from "$app/environment";

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

    const user = useUser();

    return derived<
        Readable<UserType | null>,
        CommentType[]
    >(user, ($user, set) => {
        if (!$user) {
            set([]);
            return;
        }
        return onSnapshot(
            query(
                collection(db, 'comments'),
                where('createdBy.uid', '==', $user.uid),
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

                if (dev) {
                    console.log(comments);
                }

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