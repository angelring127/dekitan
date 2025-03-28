"use client";

import React from "react";

interface FinishedTasksProps {
    tasks: string[];
}

const FinishedTasks: React.FC<FinishedTasksProps> = ({ tasks }) => {
    if (tasks.length === 0) return null;

    return (
        <div className="absolute top-4 left-4 text-black px-4 py-2 rounded">
            <ul className="mt-2 space-y-1">
                {tasks.map((task, index) => (
                    <li key={index} className="text-sm">
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinishedTasks;
