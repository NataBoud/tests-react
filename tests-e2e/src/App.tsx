import { useState } from 'react'
import './App.css'

interface Task {
  id: number
  text: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const handleAdd = () => {
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now(), 
      text: newTask.trim()
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <>
      <h2>Todo App</h2>

      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button onClick={handleAdd} disabled={!newTask.trim()}>
        Ajouter
      </button>

      {tasks.length === 0 ? (
        <p>Aucune tâche</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.text}</span>
              <button onClick={() => handleDelete(task.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
