import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

function TaskCard({ task }) {

    const { deleteTask } = useTasks();

    return (

        <div className="vnote-card">
            <header>
                <h1>{task.title}</h1>
                <div className="vnote-card-buttons">
                    <button onClick={() => deleteTask(task._id)}>Eliminar</button>
                    <p><Link to={`/tasks/${task._id}`}>Editar</Link></p>
                </div>
            </header>
            <div className="vnote-card-container">
                <p className="text-slate-300">{task.description}</p>
                <p>{new Date(task.date).toLocaleDateString()}</p>
            </div>
        </div>
    );

}

export default TaskCard;