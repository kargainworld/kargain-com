import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Link from 'next-translate/Link'
import useDimensions from 'react-use-dimensions'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import IconButton from '@material-ui/core/IconButton'
import { PhotoCamera } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import useTranslation from 'next-translate/useTranslation'
import { ReactComponent as StarSVG } from '../../public/images/svg/star.svg'
import { ReactComponent as StarSVGYellow } from '../../public/images/svg/star-yellow.svg'
import { MessageContext } from '../context/MessageContext'
import CommentsList from './Comments/CommentsList'
import AnnounceService from '../services/AnnounceService'
import { useAuth } from '../context/AuthProvider'
import { getTimeAgo } from '../libs/utils'
import TagsList from './Tags/TagsList'
import CTALink from './CTALink'
import { ModalContext } from '../context/ModalContext'
import AnnounceModel from '../models/announce.model'

const useStyles = makeStyles((theme) => ({
    card: {
        background: '#FFF',
        position: 'relative',
        height: '100%',
        padding: 0,
        border: '1px solid gainsboro',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        fontSize: '13px'
    },

    cardTop: {
        display: 'flex',
        margin: '1rem',
        [theme.breakpoints.down('md')]: {
            margin: '.3rem'
        }
    },

    cardTopInfos: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '0 1rem'
    },

    cardTopSubInfos : {
        display : 'flex',
        justifyContent : 'space-between'
    }
}))

const AnnounceCard = ({ announceRaw, featuredImgHeight }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const announce = new AnnounceModel(announceRaw)
    const [refWidth, { width }] = useDimensions()
    const { dispatchModalError } = useContext(MessageContext)
    const { dispatchModalState } = useContext(ModalContext)
    const [likesCounter, setLikesCounter] = useState(announce.getCountLikes)
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth()
    const isAuthor = isAuthenticated && authenticatedUser.getID === announce.getAuthor?.getID
   
    const checkIfAlreadyLike = () => {
        const matchUserFavorite = authenticatedUser.getFavorites.find(favorite => favorite.getID === announce.getID)
        const matchAnnounceLike = announce.getLikes.find(like => like.getAuthor.getID === authenticatedUser.getID)
        return !!matchUserFavorite || !!matchAnnounceLike
    }
    
    const alreadyLikeCurrentUser = checkIfAlreadyLike()
    
    const handleClickLikeButton = async () => {
        if (!isAuthenticated) return setForceLoginModal(true)
        try {
            if (alreadyLikeCurrentUser) {
                await AnnounceService.addLikeLoggedInUser(announce.getID)
                setLikesCounter(likesCount => likesCount + 1)
            } else {
                await AnnounceService.removeLikeLoggedInUser(announce.getID)
                setLikesCounter(likesCount => Math.max(likesCount - 1))
            }
        } catch (err) {
            dispatchModalError({ err })
        }
    }
    
    return (
        <div className="objava-wrapper cardAd" ref={refWidth}>
            <div className={classes.cardTop}>
                <div className="avatar">
                    <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                        <a className="decoration-none">
                            <img className="img-profile-wrapper rounded-circle"
                                src={announce.getAuthor.getAvatar}
                                alt={announce.getAuthor.getUsername}
                                width={70}
                            />
                        </a>
                    </Link>
                </div>

                <div className={classes.cardTopInfos}>
                    <div className="top-profile-name-btn">
                        <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                            <a className="top-profile-name">
                                <Typography as="p" variant="h4">{announce.getAuthor.getFullName}</Typography>
                            </a>
                        </Link>
                    </div>

                    {width >= 500 && (
                        <CardTopSubInfos
                            announce={announce}
                            width={width}
                        />
                    )}
                </div>
            </div>

            {width < 500 && (
                <div className="m-2">
                    <CardTopSubInfos
                        announce={announce}
                        width={width}
                    />
                </div>
            )}

            {announce.getFeaturedImg && (
                <div className="cardAd_Featured">
                    <Link href={announce.getAnnounceLink} prefetch={false}>
                        <a>
                            <LazyLoadImage
                                effect="blur"
                                src={announce.getFeaturedImg.getLocation}
                                alt={announce.getFeaturedImg.getName}
                                height={featuredImgHeight}
                                width="100%"
                            />
                        </a>
                    </Link>
                    <div className="moreThumbs">
                        <IconButton>
                            <PhotoCamera/>
                            {announce.getCountImages}
                        </IconButton>
                    </div>
                </div>
            )}
            <div className="cardAd_Content">
                <div className="price-stars-wrapper">
                    <div className="icons-profile-wrapper">
                        <div style={{ flex: 2, display: 'flex' }}>
                            
                            <div className="icons-star-prof icons-star-current svgStarYellow"
                                title={t('vehicles:i-like')}
                                onClick={() => handleClickLikeButton()}>
                                {alreadyLikeCurrentUser ? <StarSVGYellow/> : <StarSVG/>}
                                <span>{likesCounter}</span>
                            </div>
                            
                            <div className="icons-star-prof"
                                title={t('vehicles:comment_plural')}>
                                <img src="/images/svg/comment.svg" alt=""/>
                                <span>{announce.getCountComments}</span>
                            </div>
    
                            <div className="icons-star-prof"
                                onClick={() => dispatchModalState({
                                    openModalMessaging : true,
                                    modalMessagingProfile : announce.getAuthor
                                })}>
                                <MailOutlineIcon/>
                            </div>
                            
                        </div>
                        
                        <div style={{ flex: 3 }}>
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
                        </div>
                    </div>
                </div>

                <div className="cardAd_Title">
                    <Typography component="p" variant="h3">
                        {announce.getAnnounceTitle}
                    </Typography>
                </div>

                <TagsList tags={announce.getTags}/>

                {announce.getCountComments > 0 && (
                    <CommentsList comments={announce.getComments}/>
                )}

                <div className="my-2 text-center">
                    <CTALink
                        title={t('vehicles:see-announce')}
                        href={announce.getAnnounceLink}
                    />

                    {isAuthor && (
                        <CTALink
                            title={t('vehicles:edit-announce')}
                            href={announce.getAnnounceEditLink}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const CardTopSubInfos = ({width, announce}) => {
    const classes = useStyles()
    const { lang } = useTranslation()
    const { dispatchModalState } = useContext(ModalContext)
    
    return(
        <div className={clsx(classes.cardTopSubInfos, width <= 500 && 'flex-column')}>
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
            <div className="icons-star-prof"
                onClick={() => dispatchModalState({
                    openModalShare : true,
                    modalShareAnnounce : announce
                })}>
                <small className="mx-2"> {getTimeAgo(announce.getCreationDate.raw, lang)}</small>
                <img src="/images/share.png" alt=""/>
            </div>
        </div>
    )
}

AnnounceCard.propTypes = {
    announceRaw: PropTypes.any.isRequired,
    featuredImgHeight: PropTypes.number
}

AnnounceCard.defaultProps = {
    featuredImgHeight: 500
}

export default AnnounceCard
