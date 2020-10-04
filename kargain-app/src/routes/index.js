import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import { useRouter} from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import useIsMounted from '../hooks/useIsMounted'
import AnnounceService from '../services/AnnounceService'
import { MessageContext } from '../context/MessageContext'
import HomeFilters from '../components/Filters/Home/HomeFilters'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0
    },
    chip: {
        margin: theme.spacing(0.5)
    },

    filtersContainer: {
        padding: '.5rem'
    },

    filtersTop: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid gainsboro'
    },

    filtersHidden: {
        display: 'none'
    }
}))

const SearchPage = ( ) => {
    const router = useRouter()
    const classes = useStyles()
    const { query } = router.query
    const isMounted = useIsMounted()
    const { dispatchModalError } = useContext(MessageContext)
    const [state, setState] = useState({
        loading: false,
        sorter: {},
        hideFilters : false,
        filters: {},
        page: 1,
        announces: [],
        total: 0
    })

    const fetchSearch = useCallback(async () => {
        try{
            const result = await AnnounceService.getSearchAnnouncesCount(state.filters)
            setState(state => ({
                ...state,
                announces: result.rows || [],
                total: result.total || 0,
                loading: false
            }))
        } catch (err) {
            setState(state => ({
                ...state,
                loading: false
            }))
            dispatchModalError({err})
        }
    },[state.filters])

    useEffect(()=> {
        fetchSearch()
    },[fetchSearch, isMounted])

    return (
        <Container>
            <div className={classes.filtersContainer}>
                <HomeFilters
                    totalResult={state.total}
                    query={query}
                    updateFilters={filters =>{
                        setState(state => ({
                            ...state,
                            filters,
                            hideFilters: true
                        }))}}
                />
            </div>
        </Container>
    )
}

SearchPage.propTypes = {
    featuredImgHeight: PropTypes.number,
    announces: PropTypes.shape({
        rows: PropTypes.array
    })
}

SearchPage.defaultProps = {
    featuredImgHeight: 500
}
export default SearchPage
