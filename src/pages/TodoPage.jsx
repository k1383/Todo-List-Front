import { useEffect, useState } from "react";
import Element from "../components/element";
import AddElement from "./addelement";

export default function TodoPage(){
    // Récupérer tous les éléments de liste
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    // Charger TOUS les éléments de liste 
    const fetchTodos = async () => {
        try {
            // Mettre le loading à true
            setLoading(true)

            // Récupérer les données du back
            // const req = await fetch("http://localhost:3000/api/v1/todos") //app.js

            const req = await fetch("https://todo-list-back-6noy.onrender.com/api/v1/todos") //app.js
            if(!req.ok) throw new Error("Erreur lors du chargement des tâches")

            const datas =await req.json()
            setTodos(datas)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])  

    const deleteElement = async (id) => {
        try {
            const req = await fetch(`http://localhost:3000/api/v1/todos/${id}`, { method: "DELETE"})
            if(!req.ok) throw new Error("Impossible de supprimer la tâche")

            // Mise à jour local du state
            setTodos(prev => prev.filter(todo => todo._id !== id))

            // Cherche dans le state todos l'élement qui a été supprimé du state
            // Ca aura pour conséquence de déclancher un rendu du composant sans avoir a faire un autre appel au back

        } catch (error) {
            setError(error.message)
        }
    }

    const addTodo = async (title) => {
        try {
            const req = await fetch('http://localhost:3000/api/v1/todos', {
                method: "POST",
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify({ title })
            })
            
            if(!req.ok) throw Error ("Impossible d'ajouter la tâche")
            
            const res = await req.json()

            // On ajoute directement au state (plus besoins de refetch)
            setTodos(prev => [...prev, res.todo])

        } catch (error) {
            setError(error.message)
        } 
    }

    if(loading) return <p>Chargement des données en cours</p>
    if(error) return <P style={{ color:"red" }}>{error}</P>

    return (
        <>
            <h1>Ajouter une tâches</h1>
            <AddElement onAdd={addTodo} />
            <ul>
                {todos.map( todo => (
                    <Element 
                        key={todo._id} 
                        id={todo._id} 
                        title={todo.title} 
                        isCompleted={todo.isCompleted} 
                        creationDate={todo.creationDate} 
                        isCompletedDate={todo.isCompletedDate} 
                        onDelete={() => deleteElement(todo._id)}
                    />
                ) )}
            </ul>
        </>
    )

    // Afficher les éléments de liste en deux partie : à compléter et complétée

}