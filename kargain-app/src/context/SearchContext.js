import React, { useReducer, createContext, useContext } from 'react'
import { MessageContext } from './MessageContext'
import SearchService from '../services/SearchService'

const defaultValues = {
    openModalSearch : false,
    loading : false,
    filters : {},
    results : {
        tags : [],
        users : [],
        announces : []
    }
}

const SearchContext = createContext(defaultValues);

const reducer = (state, action) => ({
    ...state,
    ...action.payload
});

const SearchContextProvider = ({children}) => {
    const { dispatchModalError } = useContext(MessageContext);
    const [searchStateContext, setSearchStateContext] = useReducer(reducer, defaultValues);
    
    const dispatchSearchStateContext = (updates) => {
        setSearchStateContext({
            payload: updates
        });
    };
    
    const closeSearchModal = () => {
        dispatchSearchStateContext({
            openModalSearch : false
        })
    };
    
    const dispatchSearchQuery = (query) => {
        fetchSearch(query)
    };
    
    const fetchSearch = (query) => {
        dispatchSearchStateContext({
            openModalSearch : true,
            loading : true
        })
        
        SearchService.fetchSearchResults({ q : query })
            .then(results => {
                const { tags, users, announces } = results;
    
                dispatchSearchStateContext({
                    loading: false,
                    results: {
                        tags: tags ?? [],
                        users: users ?? [],
                        announces: announces ?? []
                    }
                });
                
            }).catch(err => {
                dispatchModalError({ err });
            });
    }
    
    return (
        <SearchContext.Provider value={{
            searchStateContext,
            dispatchSearchQuery,
            closeSearchModal
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchContextProvider };
