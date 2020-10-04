import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'

const Callback = () => {
    const router = useRouter()
    const { redirect } = router.query

    useEffect(() => {
        setTimeout(() => {
            router.push(redirect || '/')
        }, 2000)
    }, [])

    return (
        <div className="flex flex-colmun">
            <Loading fullscreen={false}/>
            <a>Redirection...</a>
        </div>
    )
}

export default Callback
