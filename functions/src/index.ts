import { onDocumentWritten } from 'firebase-functions/v2/firestore';

export const updateComments = onDocumentWritten('users/{docId}', (event) => {
    // event.data?.after.ref
    return event;
});

