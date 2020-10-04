import React, { createContext, useEffect, useState } from 'react';

const MessageContext = createContext({});

const MessageContextProvider = ({ children }) => {
    const [state, setState] = useState({
        active: false,
        type: null,
        msg: null,
        err: null,
        link: null
    });

    const dispatchModal = ({ persist, ...action }) => {
        const timeout = persist ? 4000000 : 4000;
        setState({
            active: true,
            ...action
        });

        setTimeout(() => {
            setState(state => ({
                ...state,
                active: false
            }));
        }, timeout);
    };

    useEffect(()=>{
        if(!state.active){
            setState(state => ({
                ...state,
                type: null,
                msg: null,
                err: null,
                link: null
            }));
        }
    },[state.active])

    const dispatchModalError = (action) => {
        if (action?.err?.message === "Failed to fetch")
            dispatchModal({
                ...action,
                type: 'error',
                persist: true,
                err: new Error("Can't connect to server")
            });
        else dispatchModal({
            ...action,
            type: 'error'
        });
    }

    return (
        <MessageContext.Provider value={{
            modalState : state,
            dispatchModal,
            dispatchModalError
        }}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageContextProvider };
