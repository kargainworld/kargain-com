import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import TableMUI from '../TableMUI'
import AnnounceService from '../../../services/AnnounceService'
import AnnounceModel from '../../../models/announce.model'
import { MessageContext } from '../../../context/MessageContext'
import TablePaginationActions from '../TablePaginationActions'
import { getTimeAgo } from '../../../libs/utils'
import StatusBullet from './components/StatusBullet'
import VisibleBullet from './components/VisibleBullet'
import ActivatedBullet from './components/ActivatedBullet'
import CommentsListAdmin from '../../Comments/CommentsListAdmin'

const columnsData = [
    {
        title: 'ID',
        render: rowData => rowData.tableData.id + 1
    },
    {
        title: 'Avatar',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        // eslint-disable-next-line react/display-name
        render: AnnounceModel => {
            return <img
                alt=""
                title={AnnounceModel.getAuthor.getFullName}
                src={AnnounceModel.getAuthor.getAvatar}
                style={{
                    width: 40,
                    borderRadius: '50%'
                }}
            />
        }
    },
    {
        title: 'Titre',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        width: 300,
        render: AnnounceModel => AnnounceModel.getTitle
    },
    {
        title: 'Activated',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        // eslint-disable-next-line react/display-name
        render: AnnounceModel => <ActivatedBullet
            slug={AnnounceModel.getSlug}
            activated={AnnounceModel.getIsActivated}
        />
    },
    {
        title: 'Visible',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        // eslint-disable-next-line react/display-name
        render: AnnounceModel => <VisibleBullet
            slug={AnnounceModel.getSlug}
            visible={AnnounceModel.getIsVisible}
        />
    },
    {
        title: 'Status',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        // eslint-disable-next-line react/display-name
        render: AnnounceModel => <StatusBullet
            slug={AnnounceModel.getSlug}
            status={AnnounceModel.getStatus}
        />
    },
    {
        title: 'Création',
        render: AnnounceModel => {
            const date = AnnounceModel.getRaw?.updatedAt
            return getTimeAgo(date, 'fr')
        }
    },
    {
        title: 'Type d\'annonce',
        filtering: true,
        sorting: true,
        grouping: false,
        render: AnnounceModel => AnnounceModel.getVehicleAdType
    },
    {
        title: 'Type',
        grouping: true,
        searchable: true,
        sorting: true,
        render: AnnounceModel => AnnounceModel.getVehicleType
    },
    {
        title: 'Marque',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        render: AnnounceModel => AnnounceModel.getManufacturer.make
    },
    {
        title: 'Modele',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        render: AnnounceModel => AnnounceModel.getManufacturer.model
    },
    {
        title: 'Prix',
        type: 'currency',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        currencySetting: {
            locale: 'fr',
            currencyCode: 'eur'
        },
        render: AnnounceModel => AnnounceModel.getPrice
    },
    {
        title: 'Kilométrage',
        type: 'numeric',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        render: AnnounceModel => AnnounceModel.getMileage
    },
    {
        title: 'Ville',
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        render: AnnounceModel => AnnounceModel.getAddressParts.city
    },
    {
        title: 'CP',
        numeric: true,
        filtering: false,
        grouping: false,
        searchable: true,
        sorting: true,
        render: AnnounceModel => AnnounceModel.getAddressParts.postCode
    }
]

const detailPanel = [
    {
        tooltip: 'Commentaires',
        // eslint-disable-next-line react/display-name
        render: AnnounceModel => {
            return (
                <div>
                    {AnnounceModel.getCountComments > 0 && (
                        <CommentsListAdmin comments={AnnounceModel.getComments}/>
                    )}
                </div>
            )
        }
    }
]

const AdsTable = () => {
    const rowsLength = 60
    const router = useRouter()
    const { dispatchModalError } = useContext(MessageContext)
    const columns = useMemo(() => columnsData, [])
    const [loading, setLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [resultFetch, setResultsFetch] = React.useState({
        rows: [],
        total: 0
    })

    const handleItemClick = (e, AnnounceModel) => {
        if (AnnounceModel) router.push(AnnounceModel.getAnnounceEditLink)
    }

    const handleChangePageIndex = (pageIndex) => {
        setPageIndex(pageIndex)
    }

    const fetchData = React.useCallback(() => {
        setLoading(true)
        AnnounceService.getAnnouncesAll({
            size: rowsLength,
            page: pageIndex
        })
            .then(data => {
                const { rows } = data
                const rowsModel = rows.map(row => new AnnounceModel(row))
                setResultsFetch({
                    ...data,
                    rows: rowsModel
                })
                setLoading(false)
            })
            .catch(err => {
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
                detailPanel={detailPanel}
                columns={columns}
                title="Annonces Kargain"
                actions={[
                    {
                        icon: AddIcon,
                        tooltip: 'Ajouter une annonce',
                        isFreeAction: true,
                        onClick: () => router.history.push('/admin/ads/new')
                    },
                    {
                        icon: VisibilityIcon,
                        tooltip: 'Voir',
                        onClick: (e, AnnounceModel) => handleItemClick(e, AnnounceModel)
                    },
                    {
                        icon: EditIcon,
                        tooltip: 'Modifier',
                        onClick: (e, AnnounceModel) => handleItemClick(e, AnnounceModel)
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


export default AdsTable
