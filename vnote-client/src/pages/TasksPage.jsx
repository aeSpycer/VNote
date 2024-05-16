import { useEffect, useState  } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

import '../assets/taskCard.css';

function TasksPage() {

    const { getTasks, tasks } = useTasks();
    const [columns, setColumns] = useState(3);

    useEffect(() => {

        getTasks();

    }, []);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            const numColumns = Math.max(1, Math.floor(width / 420)); // Ajusta el 300 al ancho deseado para cada columna
            setColumns(numColumns);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);

        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const createColumns = () => {
        const columnsArray = Array.from({ length: columns }, () => []);
        tasks.forEach((task, index) => {
            columnsArray[index % columns].push(task);
        });
        return columnsArray;
    };
    
    const columnsContent = createColumns();

    return (
        <div className="vnote-tasks-wall">
            {columnsContent.map((column, columnIndex) => (
                <div key={columnIndex} className="vnote-tasks-column">
                    {column.map(task => (
                        <TaskCard task={task} key={task._id} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default TasksPage;