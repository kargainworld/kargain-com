import React, { useEffect } from 'react'
import SearchPage from '../components/SearchPage'
import { useAuth } from '../context/AuthProvider'
import useIsMounted from '../hooks/useIsMounted'

const Feed = () => {
    const { isAuthenticated, setForceLoginModal } = useAuth();
    const isMounted = useIsMounted()

    useEffect(()=> {
        if(isMounted && !isAuthenticated){
            setForceLoginModal(true, true);
        }
        else{
            setForceLoginModal(false);
        }
    },[isMounted, isAuthenticated])

    return <SearchPage fetchFeed={true}/>
};

export default Feed;
