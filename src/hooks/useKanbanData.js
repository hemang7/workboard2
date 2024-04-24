import { useState, useEffect } from 'react';
import { db } from '../firebase/fbConfig';

const useKanbanData = (userId, boardId, projectId) => {
    // State variables for tasks, columns, final, and boardName
    const [tasks, setTasks] = useState(null);
    const [columns, setColumns] = useState(null);
    const [final, setFinal] = useState(null);
    const [boardName, setBoardName] = useState('');

    // Fetch tasks from Firestore
    useEffect(() => {
        const unsubscribeTasks = db.collection(`users/${userId}/projects/${projectId}/boards/${boardId}/tasks`)
            .onSnapshot(snap => {
                const documents = [];
                snap.forEach(d => {
                    documents.push({ id: d.id, ...d.data() });
                });
                setTasks(documents);
            });

        return () => unsubscribeTasks();
    }, [userId, boardId, projectId]);

    // Fetch board name from Firestore
    useEffect(() => {
        const unsubscribeBoardName = db.collection(`users/${userId}/projects/${projectId}/boards`)
            .doc(boardId)
            .onSnapshot(snap => {
            
                setBoardName(snap.data()?.name);
            });

        return () => unsubscribeBoardName();
    }, [userId, boardId, projectId]);

    // Fetch columns from Firestore
    useEffect(() => {
        const unsubscribeColumns = db.collection(`users/${userId}/projects/${projectId}/boards/${boardId}/columns`)
           
            .onSnapshot(snap => {
                const documents = [];
                snap.forEach(d => {
                    documents.push({ id: d.id, ...d.data() });
                });
                setColumns(documents);
            
            });

        return () => unsubscribeColumns();
    }, [userId, boardId, projectId]);

    // Combine tasks, columns, and boardName into final object when tasks and columns are fetched
    useEffect(() => {
        if (tasks || columns) {
            const finalObject = {
                tasks: {},
                columns: [],
                columnOrder: columns?.find(c => c.id === 'columnOrder')?.order
            };

            tasks.forEach(t => {
                finalObject.tasks[t.id] = t;
            });

            columns?.filter(c => c.id !== 'columnOrder').forEach(c => {
                finalObject.columns[c.id] = c;
            });

            setFinal(finalObject);
        }
    }, [tasks, columns]);

    return { initialData: final, setInitialData: setFinal, boardName };
};

export default useKanbanData;