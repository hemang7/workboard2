import { useState, useEffect } from 'react';
import { db } from '../firebase/fbConfig';

const useProjects = (userId) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = db.collection(`users/${userId}/projects`).onSnapshot(snapshot => {
            const documents = [];
            snapshot.forEach(doc => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            setProjects(documents);
            setLoading(false);
        }, error => {
            setError(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    return { projects, loading, error };
};

export default useProjects;
