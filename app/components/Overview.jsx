import React from 'react'
import {
    ListBulletIcon
  } from "@heroicons/react/24/outline";

const Overview = async () => {
    const resTodos = await fetch("https://jsonplaceholder.typicode.com/todos")
    const allTodos = await resTodos.json()
    const completedTodos = allTodos.filter(todo => todo.completed == true)

    return (
        <div className="mt-5 text-2xl">
            <div className="w-full bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md">
            <div className="flex items-center gap-2">
                <ListBulletIcon className="h-8 w-8 text-blue-700"/>
                <h2 className="font-bold"> Overview </h2>
            </div>
                <p className="text-sm text-gray-500"> {completedTodos.length} completed of {allTodos.length} total</p>

                {/* Task Progress Bar */}
                <div className="bg-gray-300 h-4 rounded">
                    <div className={`bg-blue-700 h-full rounded`} style={{width: `${(completedTodos.length / allTodos.length) * 100}%`}}></div>
                </div>

            </div>
        </div>
    )
}

export default Overview