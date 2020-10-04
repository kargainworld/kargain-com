import React, { createContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const FormContext = createContext({})

const reducer = (state, action) => {
    if (action.type === 'update') {
        return {
            ...state,
            ...action.payload
        }
    } else if (action.type === 'clear') {
        return {}
    } else {
        console.log('unknown action')
        return state
    }
}

const FormContextProvider = ({ formKey, children }) => {
    const [getFormData, storeFormData, clearFormData] = useLocalStorage(`formData_${formKey.toLowerCase()}`)
    const [formDataContext, dispatchFormDataContext] = useReducer(reducer, getFormData)

    const dispatchFormUpdate = (updates) => {
        dispatchFormDataContext({
            type: 'update',
            payload: updates
        })
    }

    const dispatchFormClear = () => {
        dispatchFormDataContext({
            type: 'clear',
            payload: {}
        })
        clearFormData()
    }

    useEffect(() => {
        if(formKey){
            storeFormData(formDataContext)
        }
    }, [formDataContext])

    return (
        <FormContext.Provider value={{
            formDataContext,
            dispatchFormUpdate,
            dispatchFormClear
        }}>
            {children}
        </FormContext.Provider>
    )
}

FormContextProvider.defaultProps = {
    formKey: ''
}

export { FormContext, FormContextProvider }
