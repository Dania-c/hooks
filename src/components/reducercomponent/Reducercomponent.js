import React, { useState, useReducer, useEffect } from 'react'
import Modal from './Modal'
import axios from 'axios';
export default function Reducercomponent() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://jsonplaceholder.typicode.com/users')
            setUsers(result.data);

        }
        fetchData();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            setShowModal(true)
            setUsers([...users, { id: new Date().getTime().toString(), name }])
            setName('')
        }
        else {
            setShowModal(true)
        }
    }
    return (
        <>
            <h1>Reducercomponent</h1>
            {showModal && <Modal />}
            <p>m</p>
            <ul>
                {users && users.map((d) => <li key={d.id}>{d.name}</li>)}
            </ul>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </>
    )
}
