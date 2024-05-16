import { useTasks } from '../context/TasksContext';
import { useAuth } from "../context/AuthContext";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../assets/taskCardPagePost.css';

function TaskPage() {

    const { getTask } = useTasks();
    const [title, setTitle] = useState("Titulo");
    const [content, setContent] = useState("Contenido ...");
    const [author, setAuthor] = useState("Anonimo");

    const params = useParams();
    const { getUser } = useAuth();

    useEffect(() => {

        async function loadTask() {

            if (params.id) {

                const task = await getTask(params.id);

                setTitle(task.title);
                setContent(task.description);

                const author = await getUser(task.user._id);
                
                setAuthor(author.username);
            }

        }
        loadTask();

    }, [params.id, getTask]);

    return (

        <div className='vnote-one-task-wall'>
            <div className='vnote-one-task-card'>

                <h1>{title}</h1>

                <pre>
                    {content}
                    <br />
                    <br />
                    <span>-- {author}</span>
                </pre>


                <button><Link to='/'>Volver</Link></button>

            </div>
        </div>
    );
}

export default TaskPage;