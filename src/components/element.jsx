import { useState } from "react"

export default function Element({ id, title, isCompleted, creationDate, onDelete, isCompletedDate = null}){
    const [showIsCompleted, setShowIsCompleted]  = useState(isCompleted)
    const [showCompletedDate, setShowCompletedDate] = useState(isCompletedDate)
    const [error, setError] = useState(null)
    const toggleTodo= async (id) => {
        try {
            const req = await fetch(`http://localhost:3000/api/v1/todos/${id}`, { method: "PATCH"})
            if(!req.ok) throw new Error("Impossible de mettre à jour la tâche")
            setShowIsCompleted(!showIsCompleted)
        const res = await req.json()
            setShowCompletedDate(res.isCompletedDate)
        } catch (error) {
            setError(error.message)
        }
    }

    if(error) return <p style={{color: "red"}}>{error}</p>
     
    return (
        <li>
            <span style={{color: "red"}} onClick={onDelete}>X</span>
            <input 
                type="checkbox" checked={showIsCompleted} 
                onChange={() => toggleTodo(id)}
            /> 
            - {title} 
            - {new Date(creationDate).toLocaleString()} 
            {showIsCompleted && new Date(showCompletedDate).toLocaleString()}
            {/* {completedDate != null ? ` - ${completedDate}` : ''} */}
        </li>
    )
}