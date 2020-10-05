import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import UsersService from '../../../services/UsersService'
import UserModel from '../../../models/user.model'
import TableMUI from '../TableMUI'
import BulletPoint from '../../BulletPoint'
import TablePaginationActions from '../TablePaginationActions'
import { MessageContext } from '../../../context/MessageContext'
import ActivatedBullet from './components/ActivatedBullet'
import IsProBullet from './components/IsProBullet'

const BooleanBullet = (value) => {
    if (value) return <BulletPoint tooltipHelper="Payé" color="green"/>
    return <BulletPoint tooltipHelper="Refusé" color="red"/>
}

const UsersTable = () => {
    const rowsLength = 60
    const router = useRouter()
    const { dispatchModalError } = useContext(MessageContext)
    const [loading, setLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [resultFetch, setResultsFetch] = useState({
        rows: [],
        total: 0
    })

    const columns = React.useMemo(() => [
        {
            title: 'Avatar',
            field: 'avatar',
            filtering: false,
            grouping: false,
            searchable: false,
            render: function renderField(userModel){
                return (
                    <img src={userModel.getAvatar} style={{
                        width: 40,
                        borderRadius: '50%'
                    }} alt=""/>
                )
            }
        },
        {
            title: 'Role',
            filtering: true,
            grouping: true,
            searchable: true,
            render: userModel => userModel.getRole

        },
        {
            title: 'Nom Prénom',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getFullName

        },
        {
            title: 'Email',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getEmail

        },
        {
            title: 'Activated',
            field: 'status',
            type: 'boolean',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            // eslint-disable-next-line react/display-name
            render: UserModel => <ActivatedBullet
                username={UserModel.getUsername}
                value={UserModel.getIsActivated}
            />
        },
        {
            title: 'Pro',
            type: 'boolean',
            filtering: true,
            grouping: true,
            sorting: true,
            searchable: true,
            // eslint-disable-next-line react/display-name
            render: UserModel => <IsProBullet
                username={UserModel.getUsername}
                value={UserModel.getIsPro}
            />
        },
        {
            title: 'Premium',
            type: 'boolean',
            filtering: true,
            grouping: true,
            sorting: true,
            searchable: true,
            render: userModel => BooleanBullet(userModel.getHasProPlan)
        },
        {
            title: 'Offre',
            filtering: true,
            grouping: true,
            sorting: true,
            searchable: true,
            render: userModel => userModel.getSubscriptionOfferTitle
        },
        {
            title: 'Nombre d`\'annnonces',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getCountGarage
        }
    ], [])

    const handleItemClick = (e, userModel) => {
        if (userModel) router.push(userModel.getProfileEditLink)
    }

    const handleChangePageIndex = (pageIndex) => {
        setPageIndex(pageIndex)
    }

    const fetchData = React.useCallback(() => {
        setLoading(true)

        UsersService.getUsers({
            size: rowsLength,
            page: pageIndex
        })
            .then(data => {
                const { rows } = data
                const rowsModel = rows.map(row => new UserModel(row))
                setResultsFetch({
                    ...data,
                    rows: rowsModel
                })
                setLoading(false)
            }).catch(err => {
                dispatchModalError({ err })
            })
    }, [rowsLength, pageIndex])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <>
            <TableMUI
                loading={loading}
                data={resultFetch.rows}
                columns={columns}
                pageSize={resultFetch.rows.length}
                title="Utilisateurs Kargain"
                actions={[
                    {
                        icon: AddIcon,
                        tooltip: 'Ajouter un utilisateur',
                        isFreeAction: true,
                        onClick: (event, rowData) => router.history.push('/admin/users/new')
                    },
                    {
                        icon: EditIcon,
                        tooltip: 'Modifier',
                        onClick: (e, userModel) => handleItemClick(e, userModel)
                    }
                ]}
            />

            {!loading && resultFetch.total && (
                <TablePaginationActions
                    count={resultFetch.total}
                    page={pageIndex}
                    rowsPerPage={rowsLength}
                    onChangePage={handleChangePageIndex}
                />
            )}
        </>
    )
}

export default UsersTable
