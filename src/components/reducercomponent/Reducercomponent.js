import React, { useState, useReducer, useEffect } from 'react'
import Modal from './Modal'
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            // const items = [...state.users, action.payload]
            return {
                ...state,
                users: action.payload,
                isModalOpen: false,
                modalContent: ''
            }
        case "ADD":
            const newUsers = [...state.users, action.payload]
            return {

                ...state,
                users: newUsers,
                isModalOpen: true,
                modalContent: 'user added'
            }
        default:
            return state;

    }


}
const defaultState = {
    users: [],
    isModalOpen: false,
    modalContent: 'any'
}

export default function Reducercomponent() {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const [name, setName] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://jsonplaceholder.typicode.com/users')
            dispatch({ type: 'LOADING', payload: result.data });

        }
        fetchData();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            dispatch({ type: 'ADD', payload: { id: new Date().getTime().toString(), name } });


            setName('')
        }
        else {

        }
    }
    return (
        <>
            <h1>Reducercomponent</h1>
            {state.isModalOpen && <Modal modalContent={state.modalContent} />}
            <p>m</p>
            <ul>
                {state.users && state.users.map((d) => <li key={d.id}>{d.name}</li>)}
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
