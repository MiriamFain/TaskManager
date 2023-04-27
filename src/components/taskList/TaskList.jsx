import TaskItem from '../taskItem/TaskItem';
import './taskList.css';

// const mockTasks = [
//     {
//         id: 1,
//         description: 'Task 1',
//         created_at: '2022-12-31 00:00:00',
//         is_important: true,
//         is_urgent: false,
//     },
//     {
//         id: 2,
//         description: 'Task 2',
//         created_at: '2022-12-31 00:00:00',
//         is_important: false,
//         is_urgent: true,
//     },
//     {
//         id: 3,
//         description: 'Task 3',
//         created_at: '2022-12-31 00:00:00',
//         is_important: false,
//         is_urgent: false,
//     },
// ];

const TaskList = ({
    tasks,
    handleMarkImportant,
    handleMarkUrgent,
    handleDelete,
    handleMarkComplete,
    handleEdit,
}) => {
    if (!Array.isArray(tasks) || tasks.length === 0) {
        return <p>There are no tasks...</p>;
    }

    return (
        <div className="g-col task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    handleMarkImportant={handleMarkImportant}
                    handleMarkUrgent={handleMarkUrgent}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onComplete={handleMarkComplete}
                />
            ))}
            <button className="load_more">Load More</button>
        </div>
    );
};

export default TaskList;
