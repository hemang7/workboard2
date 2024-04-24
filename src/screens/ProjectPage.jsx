// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { db } from '../firebase/fbConfig';

// const ProjectPage = ({ match, userId }) => {
//     const [projects, setProjects] = useState([]);

//     useEffect(() => {
//         const projectId = match.params.projectId;
//         const userId = userId; // Replace 'yourUserId' with the actual user ID

//         const fetchProjects = async () => {
//             try {
//                 const snapshot = await db.ref(`users/${userId}/projects/${projectId}/boards`).once('value');
//                 const boardsData = snapshot.val();
//                 if (boardsData) {
//                     const boardsArray = Object.entries(boardsData).map(([boardId, board]) => ({ id: boardId, ...board }));
//                     setBoards(boardsArray);
//                 }
//             } catch (error) {
//                 console.error('Error fetching boards:', error);
//             }
//         };

//         fetchBoards();

//         // Clean-up function
//         return () => {
//             // Perform any clean-up if needed
//         };
//     }, [match.params.projectId]);

//     const addNewBoard = () => {
//         const boardName = prompt('Enter the name for the new board:');
//         if (boardName) {
//             const boardId = db.ref(`users/${project.userId}/projects/${project.id}/boards`).push().key;
//             db.ref(`users/${project.userId}/projects/${project.id}/boards/${boardId}`).set({ name: boardName });
//         }
//     };

//     return (
//         <div className="container mx-auto">
//             <h1 className="text-2xl font-bold mt-8 mb-4">Project Boards</h1>
//             <div className="grid grid-cols-3 gap-4">
//                 {boards.map(board => (
//                     <div key={board.id} className="bg-white text-gray-700 py-4 px-6 rounded-sm shadow-md">
//                         <h2 className="text-lg font-semibold">{board.name}</h2>
//                     </div>
//                 ))}
//                 <div className="bg-white text-gray-700 py-4 px-6 rounded-sm shadow-md cursor-pointer flex justify-center items-center" onClick={addNewBoard}>
//                     <span className="text-3xl">+</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectPage;
