
import React, { useReducer, useEffect } from 'react'
const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD":
            return {
                ...state,
                title: action.payload
            }

        case "CLICK":
            return {
                ...state,
                msg: action.payload
            }
        default:
            return state
    }
}
const DefaultState = {
    title: "t",
    msg: ""

}
function Comp() {
    const [state, dispatch] = useReducer(reducer, DefaultState)
    const vv = () => {
        dispatch({ type: "CLICK", payload: "a message" });

    }
    useEffect(() => {
        if (state.msg) alert(state.msg)
    }, [state.msg])
    return (
        <>
            <h1>{state.title}</h1>
            <button onClick={() => {

                vv()
            }
            }>click</button>
            <button onClick={() => { dispatch({ type: "LOAD", payload: "a title" }) }}>click</button>
        </>
    )
}

export default Comp