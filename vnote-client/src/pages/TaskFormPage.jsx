import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import '../assets/taskCardPage.css';

function TaskFormPage() {

    const {register, handleSubmit, setValue} = useForm();
    const { createTask, getTask, updateTask } = useTasks();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        async function loadTask() {

            if (params.id) {

                const task = await getTask(params.id);
                setValue('title', task.title);
                setValue('description', task.description);
    
            }

        }
        loadTask();

    }, []);

    const onSubmit = handleSubmit(data => {

        if (params.id) {

            updateTask(params.id, data);

        } else {

            createTask(data);

        }

        navigate('/tasks')
    });



    return (

        <div className='vnote-one-task-wall'>
            <div className='vnote-one-task-card'>

                <form onSubmit={onSubmit}>

                    <input type="text" placeholder="Titulo" name="title" { ...register("title") } />

                    <textarea rows="3" placeholder="Contenido" { ...register("description") } ></textarea>

                    <button>Guardar</button>

                </form>

            </div>
        </div>
    );
}

export default TaskFormPage;