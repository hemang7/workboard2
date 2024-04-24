import { Link } from 'react-router-dom';
import { useState } from 'react';

import Modal from './Modal';
import { Exclaim, Bin } from './Icons';

const ProjectList = ({ logOut, projects, addNewProject, deleteProject, name }) => {
    const [modal, setModal] = useState(false);
    const [idToBeDeleted, setId] = useState(null);

    const removeProject = (id) => {
        setModal(false);
        deleteProject(id);
    };

    const openDeleteModal = (id) => {
        setId(id);
        setModal(true);
    };

    if (projects === null) {
        // Render loading indicator or placeholder
        return <div>Loading...</div>;
    }

    console.log('projects in projectList : ', projects);

    return (
        <div className='bg-gradient-to-br from-white via-indigo-100 to-primary h-screen px-6 py-4 sm:py-20 sm:px-24'>
            <Modal modal={modal} setModal={setModal} ariaText='Project Delete confirmation'>
                <div className='md:px-12 '>
                    <div className='text-yellow-600 mb-2'>
                        <Exclaim />
                    </div>
                    <h2 className='text-base md:text-3xl text-gray-900 mb-2'>Are you sure you want to delete this Project?</h2>
                    <h3 className="text-red-600 text-sm md:text-lg">All of its data will be permanently deleted and cannot be undone.</h3>
                    <div className="my-8 flex">
                        <button className='border border-red-700 text-red-600 px-2 py-1 rounded-sm mr-4 text-sm md:text-base' onClick={() => removeProject(idToBeDeleted)}>Yes, delete</button>
                        <button className='bg-blue-800 text-gray-100 px-2 py-1 rounded-sm text-sm md:text-base' onClick={() => setModal(false)}>No, go back</button>
                    </div>
                </div>
            </Modal>
            <div className='flex flex-col my-2'>
                <div className='flex justify-between'>
                    <h1 className='text-xl sm:text-3xl bg-gradient-to-r from-indigo-500 to-primary bg-clip-text text-transparent'>Welcome, {name ? name.split(' ')[0] : 'Stranger'}</h1>
                    <button className='px-3 border border-red-800 hover:bg-red-700 hover:text-white text-red-800 px-2 py-1 rounded-sm text-sm sm:text-base' onClick={logOut}>Log out</button>
                </div>
                <div className="my-12">
                    <h1 className='text-xl text-blue-900'>Your Projects</h1>
                    <div className="flex flex-wrap mt-2">
                    {projects.projects && projects.projects.length > 0 ? (
    projects.projects.map(project => (
        <div className='bg-white text-gray-700 mb-3 mr-4 py-4 px-6 rounded-sm shadow-md w-full sm:w-auto' key={project.id}>
            <div className="flex items-center justify-between">
                <Link to={`/project/${project.id}`}><h2 className='text-lg sm:text-2xl text-gray-700 hover:text-gray-900'>{project.name}</h2></Link>
                <div onClick={() => openDeleteModal(project.id)} className='text-red-500 ml-6 cursor-pointer hover:text-red-700'>
                    <Bin />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1 className='text-gray-700'>No Projects created yet. Why don't you go ahead and create one?</h1>
                        )}
                    </div>
                </div>
            </div>
            <form onSubmit={addNewProject} autoComplete='off' className='my-4 sm:my-8'>
                <label htmlFor="projectName" className='block text-xl text-blue-900'>Make a new project</label>
                <div className="flex items-center mt-2">
                    <input required type="text" name='projectName' className='bg-transparent border border-gray-500 px-2 py-1 rounded-sm placeholder-gray-700' placeholder='Enter a project name' />
                    <button type='submit' className='bg-green-600 hover:bg-green-900 text-green-50  rounded-sm px-2 py-1.5' >Add</button>
                </div>
            </form>
        </div>
    );
};

export default ProjectList;
