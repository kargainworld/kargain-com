import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'
import Link from 'next-translate/Link'
import { useRouter } from 'next/router'
import { Col, Container, Row } from 'reactstrap'
import Alert from '@material-ui/lab/Alert'
import { useMediaQuery } from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTranslation from 'next-translate/useTranslation'
import { ReactComponent as StarSVG } from '../../../../public/images/svg/star.svg'
import { ReactComponent as StarSVGYellow } from '../../../../public/images/svg/star-yellow.svg'
import GalleryViewer from '../../../components/Gallery/GalleryViewer'
import GalleryImgsLazy from '../../../components/Gallery/GalleryImgsLazy'
import DamageViewerTabs from '../../../components/Damages/DamageViewerTabs'
import CarInfos from '../../../components/Products/car/CarInfos'
import Comments from '../../../components/Comments/Comments'
import TagsList from '../../../components/Tags/TagsList'
import CTALink from '../../../components/CTALink'
import AnnounceService from '../../../services/AnnounceService'
import AnnounceModel from '../../../models/announce.model'
import { MessageContext } from '../../../context/MessageContext'
import { ModalContext } from '../../../context/ModalContext'
import { useAuth } from '../../../context/AuthProvider'
import { getTimeAgo } from '../../../libs/utils'
import Error from '../../_error'

const useStyles = makeStyles(() => ({
    formRow: {
        display: 'flex',

        '& > div': {
            margin: '1rem',
            flex: 1
        }
    },
    
    cardTopInfos: {
        display : 'flex',
        justifyContent : 'space-between',
        margin: '1rem 0'
    },
    
    priceStarsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '15px 0',
        borderBottom : '1px solid'
    },
    wysiwyg: {
        margin: '1rem'
    }
}))

const Announce = () => {
    const refImg = useRef()
    const theme = useTheme()
    const classes = useStyles()
    const router = useRouter()
    const { slug } = router.query
    const { t, lang } = useTranslation()
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth()
    const { dispatchModalError } = useContext(MessageContext)
    const { dispatchModalState } = useContext(ModalContext)
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    })

    const [state, setState] = useState({
        err : null,
        stateReady : false,
        isSelf : false,
        isAdmin : false,
        announce : new AnnounceModel(),
        likesCounter : 0
    })
    
    const { announce } = state
    
    const handleCLickImg = (index) => {
        if (refImg.current) {
            refImg.current.slideToIndex(index)
            refImg.current.fullScreen()
        }
    }

    const checkIfAlreadyLike = () => {
        const matchUserFavorite = authenticatedUser.getFavorites.find(favorite => favorite.getID === announce.getID)
        const matchAnnounceLike = announce.getLikes.find(like => like.getAuthor.getID === authenticatedUser.getID)
        return !!matchUserFavorite || !!matchAnnounceLike
    }

    const alreadyLikeCurrentUser = checkIfAlreadyLike()

    const handleClickLikeButton = async () => {
        if (!isAuthenticated) return setForceLoginModal(true)
        let counter = state.likesCounter
        
        try {
            if (alreadyLikeCurrentUser) {
                await AnnounceService.removeLikeLoggedInUser(announce.getID)
                setState(state => ({
                    ...state,
                    likesCounter : Math.max(0, counter - 1)
                }))
            } else {
                await AnnounceService.addLikeLoggedInUser(announce.getID)
                setState(state => ({
                    ...state,
                    likesCounter : counter + 1
                }))
            }
        } catch (err) {
            dispatchModalError({ err })
        }
    }

    const fetchAnnounce = useCallback(async () => {
        try{
            const result = await AnnounceService.getAnnounceBySlug(slug)
            const { announce, isAdmin, isSelf } = result
            console.log(result)
            
            setState(state => ({
                ...state,
                stateReady : true,
                announce : new AnnounceModel(announce),
                isAdmin,
                isSelf
            }))
        } catch (err) {
            setState(state => ({
                ...state,
                stateReady: true,
                err
            }))
        }
    },[slug])

    useEffect(()=>{
        fetchAnnounce()
    },[fetchAnnounce])

    if (!state.stateReady) return null
    if (state.err) return <Error statusCode={state.err?.statusCode}/>

    return (
        <Container>
    
            <NextSeo
                title={`${announce.getTitle} - Kargain`}
                description={announce.getTheExcerpt()}
            />
            
            {state.isAdmin && (
                <Alert severity="info" className="mb-2">
                    Connected as Admin
                </Alert>
            )}

            <div className="objava-wrapper">
                {!announce.getIsActivated && (
                    <Alert severity="warning">
                        Your announce is hidden from public & waiting for moderator activation
                    </Alert>
                )}

                {!announce.getIsVisible && (
                    <Alert color="warning">
                        Your announce is currently not published (draft mode)
                    </Alert>
                )}

                <Row>
                    <Col sm={12} md={6}>
                        <div className="top">
                            <Typography as="h2" variant="h2">
                                {announce.getAnnounceTitle}
                            </Typography>
    
                            <div className={classes.cardTopInfos}>
                                <div className="price-announce">
                                    {(isAuthenticated && authenticatedUser.getIsPro) ? (
                                        <>
                                            <span className="mx-1">
                                                <strong>
                                                    {announce.getPriceHT}€ HT
                                                </strong>
                                            </span>
                                            <span> - </span>
                                            <span className="mx-1">
                                                <small>{announce.getPrice}€</small>
                                            </span>
            
                                        </>
                                    ) : (
                                        <span>{announce.getPrice} €</span>
                                    )}
                                </div>
    
                                <div className="icons-star-prof"
                                    onClick={() => dispatchModalState({
                                        openModalShare : true,
                                        modalShareAnnounce : announce
                                    })}>
                                    <small className="mx-2"> {getTimeAgo(announce.getCreationDate.raw, lang)}</small>
                                    <img src="/images/share.png" alt=""/>
                                </div>
                            </div>
                        </div>

                        <div className="pics">
                            {announce.getCountImages > 0 && (
                                <>
                                    <GalleryViewer images={announce.getImages} ref={refImg}/>
                                    {isDesktop && (
                                        <GalleryImgsLazy
                                            images={announce.getImages}
                                            handleCLickImg={handleCLickImg}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </Col>

                    <Col sm={12} md={6}>
                        <div className={classes.formRow}>
                            <div className="pic" style={{ flex: 1 }}>
                                <img
                                    src={announce.getAuthor.getAvatar}
                                    className="img-profile-wrapper avatar-preview"
                                    width={80}
                                    alt={announce.getTitle}
                                />
                            </div>

                            <div style={{ flex: 4 }}>
                                <Link href={`/profile/${announce.getAuthor.getUsername}`}>
                                    <a>
                                        <Typography variant="h3" component="h2">
                                            {announce.getAuthor.getFullName}
                                        </Typography>
                                    </a>
                                </Link>

                                {announce.getAdOrAuthorCustomAddress(['city', 'postCode', 'country']) && (
                                    <div className="top-profile-location">
                                        <a href={announce.buildAddressGoogleMapLink()}
                                            target="_blank"
                                            rel="noreferrer">
                                            <span className="top-profile-location">
                                                <img className="mx-1" src="/images/location.png" alt=""/>
                                                {announce.getAdOrAuthorCustomAddress()}
                                            </span>
                                        </a>
                                    </div>
                                )}
                                {announce.showCellPhone && <p> {announce.getAuthor.getPhone} </p> }
                            </div>
                        </div>

                        <TagsList tags={announce.getTags}/>

                        <div className={clsx('price-stars-wrapper', classes.priceStarsWrapper)}>
                            <div className="icons-profile-wrapper">
                                <div className="icons-star-prof svgStarYellow">
                                    <span onClick={()=>handleClickLikeButton()}>
                                        {alreadyLikeCurrentUser ? <StarSVGYellow/> : <StarSVG/>}
                                    </span>
                                    <div className="mx-1">
                                        <span>
                                            {announce.getCountLikes} {t('vehicles:like', { count : state.likesCounter})}
                                        </span>
                                    </div>
                                </div>

                                <div className="icons-star-prof">
                                    <CommentIcon/>
                                    <div className="mx-1">
                                        <span>
                                            {announce.getCountComments} {t('vehicles:comment', { count : announce.getCountComments })}
                                        </span>
                                    </div>
                                </div>
    
                                {(state.isAdmin || state.isSelf) ? (
                                    <div className="mx-2">
                                        <CTALink
                                            href={announce.getAnnounceEditLink}
                                            title={t('vehicles:edit-announce')}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="icons-star-prof mx-2"
                                        onClick={() => dispatchModalState({
                                            openModalMessaging : true,
                                            modalMessagingProfile : announce.getAuthor
                                        })}>
                                        <MailOutlineIcon/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Comments announceRaw={announce.getRaw}/>
                    </Col>
                </Row>

                <section className="my-2">
                    <Typography component="h3" variant="h3">
                        {t('vehicles:vehicle-data')}
                    </Typography>
                    <CarInfos
                        announce={announce}
                        enableThirdColumn
                    />
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:equipments')}</Typography>
                    <Row>
                        {announce.getVehicleEquipments.map((equipment, index) => {
                            return (
                                <Col sm={6} md={3} key={index}>
                                    <div className="equipment m-3">
                                        <Typography>{equipment.label}</Typography>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">{t('vehicles:description')}</Typography>
                    <div className={classes.wysiwyg}>
                        <Typography>
                            {announce.getDescription}
                        </Typography>
                    </div>
                </section>

                <section className="my-2">
                    <Typography component="h3" variant="h3">
                        {t('vehicles:data-sheet')}
                    </Typography>
                    <DamageViewerTabs
                        tabs={announce.getDamagesTabs}
                        vehicleType={announce.getVehicleType}
                    />
                </section>
            </div>
        </Container>
    )
}

export default Announce
