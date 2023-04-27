import react, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TaskForm from './components/taskForm/TaskForm';
import TaskList from './components/taskList/TaskList';
import Header from './components/header/Header';
import Notification from './components/Notification';
import {
    getTasks,
    createTask,
    deleteTask,
    markTaskAsImportant,
    unmarkTaskAsImportant,
    markTaskAsUrgent,
    unmarkTaskAsUrgent,
    markTaskAsCompleted,
    unmarkTaskAsCompleted,
} from './api/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await getTasks(1, 25);
            setTasks(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleMarkImportant = async (taskId, isImportant) => {
        if (isImportant) {
            await markTaskAsImportant(taskId);
        } else {
            await unmarkTaskAsImportant(taskId);
        }
        const updTasks = tasks.map(task =>
            task.id === taskId ? { ...task, important: isImportant } : task,
        );
        setTasks(updTasks);

        fetchTasks();
    };

    const handleMarkUrgent = async (taskId, isUrgent) => {
        if (isUrgent) {
            await markTaskAsUrgent(taskId);
        } else {
            await unmarkTaskAsUrgent(taskId);
        }
        const updTasks = tasks.map(task =>
            task.id === taskId ? { ...task, urgent: isUrgent } : task,
        );
        setTasks(updTasks);

        fetchTasks();
    };

    const handleMarkComplete = async (taskId, isComplete) => {
        if (isComplete) {
            await markTaskAsCompleted(taskId);
        } else {
            await unmarkTaskAsCompleted(taskId);
        }
        const completed_at = isComplete ? Date.now() : null;
        const updTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed_at } : task,
        );
        setTasks(updTasks);

        fetchTasks();
    };

    const handleDelete = async taskId => {
        await deleteTask(taskId);
        const updTasks = tasks.filter(({ id }) => id !== taskId);
        setTasks(updTasks);

        fetchTasks();
    };

    const handleEdit = async taskId => {};

    const handleAddTask = async description => {
        console.log(description);
        const taskData = {
            description,
            created_at: new Date().toISOString(),
            important: false,
            urgent: false,
        };
        const { data } = await createTask(taskData);
        setTasks(prevTasks => {
            const updatedTasks = [data, ...prevTasks];
            return updatedTasks;
        });
    };

    return (
        <>
            <Header />
            <main>
                <div className="g-row">
                    <Notification />
                    <TaskForm onAddTask={handleAddTask} />
                    <TaskList
                        tasks={tasks}
                        handleMarkImportant={handleMarkImportant}
                        handleMarkUrgent={handleMarkUrgent}
                        handleDelete={handleDelete}
                        handleMarkComplete={handleMarkComplete}
                        handleEdit={handleEdit}
                    />
                </div>
            </main>
        </>
    );
}

export default App;
