import React from 'react';
import Button from '../button/Button';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

import './taskItem.css';

const TaskItem = ({
    task,
    handleMarkImportant,
    handleMarkUrgent,
    onDelete,
    onEdit,
    onComplete,
}) => {
    const { id, completed_at, description, created_at, important, urgent } =
        task;
    const isCompleted = Boolean(completed_at);

    return (
        <div className="task-item">
            <div className="item-left">
                <Button
                    className={`btn--icon ${isCompleted ? 'complete' : ''}`}
                    onClick={() => onComplete(id, !isCompleted)}
                >
                    <AiOutlineCheck />
                </Button>
                <div className="task-desc">
                    <span className="desc">{description}</span>
                    <span className="date">{created_at}</span>
                </div>
            </div>
            <div className="btn-list">
                <button
                    className={`btn-important ${important ? 'active' : ''}`}
                    onClick={() => handleMarkImportant(id, !important)}
                >
                    Important
                </button>
                <button
                    className={`btn-urgent ${urgent ? 'active' : ''}`}
                    onClick={() => handleMarkUrgent(id, !urgent)}
                >
                    Urgent
                </button>{' '}
                <Button className="btn--icon" onClick={() => onDelete(id)}>
                    <BsTrash />
                </Button>
                <Button className="btn--icon" onClick={() => onEdit(id)}>
                    <AiOutlineEdit />
                </Button>
            </div>
        </div>
    );
};

export default TaskItem;
