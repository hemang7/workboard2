import { useState, useEffect } from 'react';
import { db } from '../firebase/fbConfig';

const useBoards = (userId, projectId) => {
    const [boards, setBoards] = useState(null);

    useEffect(() => {
        // Check if projects is provided and not null


        const unsubscribe = db.collection(`users/${userId}/projects/${projectId}/boards`)
            .onSnapshot(snapshot => {
                const documents = [];
                snapshot.forEach(doc => documents.push({ id: doc.id, ...doc.data() }));
                setBoards(documents);
            });

        return () => unsubscribe();
    }, [userId, projectId]);

    return boards;
};

export default useBoards;
