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
        case "EMPTY_STRING":
            return {

                ...state,

                isModalOpen: true,
                modalContent: action.payload
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                isModalOpen: false,

            }
        case "DELETE":

            const filteredUsers = state.users.filter((d) =>
                d.id !== action.payload

            );
            return {
                ...state,

                users: filteredUsers
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
            dispatch({ type: 'EMPTY_STRING', payload: "Enter a name" });
        }
    }

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    }
    const deleteItem = (IdItem) => {
        dispatch({ type: 'DELETE', payload: IdItem })
        console.log("del")
    }
    return (
        <>
            <h1>Reducercomponent</h1>
            {state.isModalOpen && <Modal modalContent={state.modalContent} closeModal={closeModal} />}
            <p>m</p>
            <ul>
                {/* {state.users && state.users.map((d) => <li key={d.id}>{d.name}<button onClick={() => dispatch({ type: 'DELETE', payload: d.id })}>   Remove</button></li>)} */}
                {state.users && state.users.map((d) => <li key={d.id}>{d.name}<button onClick={() => deleteItem(d.id)}>   Remove</button></li>)}
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
