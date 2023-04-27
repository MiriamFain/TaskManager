import React, { useState } from 'react';
import './taskForm.css';

const TaskForm = ({ onAddTask }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        if (description) {
            onAddTask(description);
            setDescription('');
        }
    };

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <div className="g-col">
            <form className="task-form" onSubmit={handleSubmit} noValidate>
                <input
                    autoComplete="off"
                    autoFocus
                    className="task-form__input"
                    maxLength="64"
                    onChange={handleDescriptionChange}
                    onKeyUp={handleKeyDown}
                    placeholder="What needs to be done?"
                    type="text"
                    value={description}
                />
            </form>
        </div>
    );
};

export default TaskForm;
