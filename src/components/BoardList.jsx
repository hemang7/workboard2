import { useState } from 'react';
import { db } from '../firebase/fbConfig';
import Modal from './Modal';
import {useParams, Link } from 'react-router-dom';
import { Exclaim, Bin } from './Icons';
import { v4 as uuidv4 } from 'uuid';
import useBoards from '../hooks/useBoards';
import { Home } from './Icons';

const BoardList = ({ logOut, name, userId}) => {
    const [modal, setModal] = useState(false);
    const [idToBeDeleted, setId] = useState(null);

    const { projectId } = useParams();

    const boards = useBoards(userId, projectId);

    const addNewBoard = (e) => {
        e.preventDefault();
        const uid = uuidv4();
    
        if (!projectId) {
            console.error('No projects available to add a board to.');
            return;
        }
    
        const boardName = e.target.elements.boardName.value.trim();
    
        if (!boardName) {
            console.error('Board name cannot be empty');
            return;
        }



    
        const boardRef = db.collection(`users/${userId}/projects/${projectId}/boards`).doc(uid);
        const columnOrderRef = db.collection(`users/${userId}/projects/${projectId}/boards/${uid}/columns`).doc('columnOrder');
    
        boardRef.set({ name: boardName })
            .then(() => {
                columnOrderRef.set({ id: 'columnOrder', order: [] })
                    .then(() => {
                        console.log('Board and column order added successfully.');
                    })
                    .catch((error) => {
                        console.error('Error adding column order:', error);
                    });
            })
            .catch((error) => {
                console.error('Error adding board:', error);
            });
    
        e.target.elements.boardName.value = '';
    };

    const deleteBoard = (id) => {
        db.collection(`users/${userId}/projects/${projectId}/boards`).doc(id).delete();
    };

    const removeBoard = (id) => {
        setModal(false);
        deleteBoard(id);
    };

    const openDeleteModal = (id) => {
        setId(id);
        setModal(true);
    };

    console.log('projectId in boardList : ', projectId);
    console.log('boards in boardlist :', boards)

    if (navigator.onLine !== true) {
        return (
            <div className="p-12">
                <div className="my-12">
                    <h1 className="text-xl text-red-800">The network is disconnected. Connect and try again</h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-gradient-to-br from-white via-indigo-100 to-primary h-screen px-6 py-4 sm:py-20 sm:px-24">
                <Modal modal={modal} setModal={setModal} ariaText="Board Delete confirmation">
                    <div className="md:px-12 ">
                        <div className="text-yellow-600 mb-2">
                            <Exclaim />
                        </div>
                        <h2 className="text-base md:text-3xl text-gray-900 mb-2">Are you sure you want to delete this Board?</h2>
                        <h3 className="text-red-600 text-sm md:text-lg">All of its data will be permanently deleted and it cannot be undone.</h3>
                        <div className="my-8 flex">
                            <button className="border border-red-700 text-red-600 px-2 py-1 rounded-sm mr-4 text-sm md:text-base" onClick={() => removeBoard(idToBeDeleted)}>
                                Yes, delete
                            </button>
                            <button className="bg-blue-800 text-gray-100 px-2 py-1 rounded-sm text-sm md:text-base" onClick={() => setModal(false)}>
                                No, go back
                            </button>
                        </div>
                    </div>
                </Modal>
                <div className="flex flex-col my-2">
    <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl bg-gradient-to-r from-indigo-500 to-primary bg-clip-text text-transparent">Welcome, {name ? name.split(' ')[0] : 'Stranger'}</h1>
        <div className="flex items-center space-x-5">
            <div className='flex text-blue-700 hover:text-blue-900'>
            <Home />
            <Link to={`/`} className="text-md ml-1 sm:text-xl">Home</Link>
            </div>
            <button className="px-3 border border-red-800 hover:bg-red-700 hover:text-white text-red-800 px-2 py-1 rounded-sm text-sm sm:text-base" onClick={logOut}>Log out</button>
        </div>
    </div>





                    <div className="my-12">
                        <h1 className="text-xl text-blue-900">Your Boards</h1>
                        <div className="flex flex-wrap mt-2">
                            {boards && boards.map((board) => (
                                <div className="bg-white text-gray-700 mb-3 mr-4 py-4 px-6 rounded-sm shadow-md w-full sm:w-auto" key={board.id}>
                                    <div className="flex items-center justify-between">
                                    <Link to={`/project/${projectId}/board/${board.id}`}><h2 className='text-lg sm:text-2xl text-gray-700 hover:text-gray-900'>{board.name}</h2></Link>
                                        
                                        <div onClick={() => openDeleteModal(board.id)} className="text-red-500 ml-6 cursor-pointer hover:text-red-700">
                                            <Bin />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {boards && boards.length === 0 ? <h1 className="text-gray-700">No Boards created yet. Why don't you go ahead and create one?</h1> : null}
                        </div>
                    </div>
                </div>
                <form onSubmit={addNewBoard} autoComplete="off" className="my-4 sm:my-8">
                    <label htmlFor="boardName" className="block text-xl text-blue-900">
                        Make a new board
                    </label>
                    <div className="flex items-center mt-2">
                        <input required type="text" name="boardName" className="bg-transparent border border-gray-500 px-2 py-1 rounded-sm placeholder-gray-700" placeholder="Enter a board name" />
                        <button type="submit" className="bg-green-600 hover:bg-green-900 text-green-50  rounded-sm px-2 py-1.5">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

export default BoardList;
