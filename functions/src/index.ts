import {
    onDocumentCreated,
    onDocumentDeleted,
    onDocumentUpdated
} from 'firebase-functions/v2/firestore';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';

initializeApp();

const adminAuth = getAuth();

export const deleteUser = onDocumentDeleted(
    {
        document: 'users/{docId}'
    },
    async (event) => {

        const eventData = event.data;

        if (!eventData) {
            return null;
        }

        const userId = event.params.docId;

        // Delete in Firebase Auth
        await adminAuth.deleteUser(userId);

        const db = eventData.ref.firestore;

        // Delete all comments...

        const bulkWriter = db.bulkWriter();

        const comments = await db.collection('comments')
            .where('createdBy.uid', '==', userId)
            .get();

        // Bulk Delete by looping
        comments.forEach((comment) => {
            bulkWriter.delete(comment.ref);
        });

        bulkWriter.onWriteError((error) => {
            const MAX_RETRIES = 3;
            if (error.failedAttempts < MAX_RETRIES) {
                return true;
            }
            // Handle errors here
            return false;
        });

        await bulkWriter.close();

        // Delete all posts...

        // ...

        return event;
    });

export const createComment = onDocumentCreated(
    'comments/{commentId}',
    async (event) => {

        const eventData = event.data;

        if (!eventData) {
            return null;
        }

        // createdBy should be enforced in Security Rules
        const docData = eventData.data();

        const { displayName, photoURL } = await adminAuth.getUser(docData.createdBy.uid);

        if (docData.displayName !== displayName || docData.photoURL !== photoURL) {
            return eventData.ref.set({
                createdBy: {
                    displayName,
                    photoURL
                }
            }, { merge: true });
        }

        return event;
    });

export const updateComments = onDocumentUpdated(
    'profiles/{docId}',
    async (event) => {

        const eventData = event.data;

        if (!eventData) {
            return null;
        }

        const userId = event.params.docId;

        // Update user in Firebase Auth
        const { displayName, photoURL } = eventData.after.data();

        await adminAuth.updateUser(userId, {
            displayName,
            photoURL
        });

        // Update all comments
        const db = eventData.after.ref.firestore;

        const bulkWriter = db.bulkWriter();

        const comments = await db.collection('comments')
            .where('createdBy.uid', '==', userId)
            .get();

        // Bulk Update by looping
        comments.forEach((comment) => {
            bulkWriter.set(comment.ref, {
                createdBy: {
                    displayName,
                    photoURL
                }
            }, { merge: true });
        });

        bulkWriter.onWriteError((error) => {
            const MAX_RETRIES = 3;
            if (error.failedAttempts < MAX_RETRIES) {
                return true;
            }
            // Handle errors here
            return false;
        });

        await bulkWriter.close();

        return event;
    });

