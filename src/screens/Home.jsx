import { db } from '../firebase/fbConfig';
import { BrowserRouter, Route, useParams } from 'react-router-dom';
import BoardList from '../components/BoardList';
import Kanban from '../screens/Kanban';
import { v4 as uuidv4 } from 'uuid';
import useProjects from '../hooks/useProjects';
import ProjectList from '../components/ProjectList';

const Home = ({ logOut, userId, loginWithGoogle, name, isAnon }) => {
    const { projectId } = useParams();


    const projects = useProjects(userId);

    const addNewProject = (e) => {
        e.preventDefault();
        const projectName = e.target.elements.projectName.value;

        if (projectName.trim() === '') {
            console.error('Project name cannot be empty');
            return;
        }

        const uid = uuidv4();

        db.collection(`users/${userId}/projects`).doc(uid).set({ name: projectName });

        e.target.elements.projectName.value = '';

        const columnOrder = {id: 'columnOrder', order: []}

        db.collection(`users/${userId}/projects/${projectId}/boards/${uid}/columns`)
            .doc('columnOrder')
            .set(columnOrder)
    };

    // const columnOrder = {id: 'columnOrder', order: []}

    // db.collection(`users/${userId}/projects/${projectId}/boards/${uid}/columns`)
    //     .doc('columnOrder')
    //     .set(columnOrder)


    const deleteProject = (id) => {
        db.collection(`users/${userId}/projects`).doc(id).delete();
    };

    console.log('projects in home : ', projects)

    console.log('projectId in home : ', projectId)
   

    return (
        <BrowserRouter>
            <Route exact path='/'>
                <ProjectList deleteProject={deleteProject} logOut={logOut} projects={projects} addNewProject={addNewProject} name={name} />
            </Route>

            <Route exact path='/project/:projectId'>
                <BoardList
                    logOut={logOut}
                    name={name}
                    userId={userId}

                />
            </Route>
            <Route path='/project/:projectId/board/:boardId'>
                <Kanban userId={userId} />
            </Route>
        </BrowserRouter>
    ) 
};

export default Home;
