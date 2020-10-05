import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next-translate/Link'
import { ReactComponent as StarSVG } from '../../public/images/svg/star.svg'
import { ReactComponent as StarSVGYellow } from '../../public/images/svg/star-yellow.svg'
import { useAuth } from '../context/AuthProvider'
import TagsList from './Tags/TagsList'
import CTALink from './CTALink'
import AnnounceModel from '../models/announce.model'

const useStyles = makeStyles((theme) => ({
    card: {
        background: '#FFF',
        position: 'relative',
        height: '100%',
        border: '1px solid gainsboro',
        borderRadius : '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
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
    
    cardAvatar : {
    },
    
    cardTopInfos: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 1rem'
    },

    cardTopSubInfos : {
        display : 'flex',
        justifyContent : 'space-between'
    }
}))

const AnnounceCardLight = ({ announceRaw }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const announce = new AnnounceModel(announceRaw)
    const likesCounter = announce.getCountLikes
    const { authenticatedUser, isAuthenticated } = useAuth()
    
    const checkIfAlreadyLike = () => {
        const matchUserFavorite = authenticatedUser.getFavorites.find(favorite => favorite.getID === announce.getID)
        const matchAnnounceLike = announce.getLikes.find(like => like.getAuthor.getID === authenticatedUser.getID)
        return !!matchUserFavorite || !!matchAnnounceLike
    }
    
    const alreadyLikeCurrentUser = checkIfAlreadyLike()
    
    return (
        <div className={clsx("objava-wrapper", "cardAd", classes.card)}>
            <div className={classes.cardTop}>
                <div className={classes.cardAvatar}>
                    <Link href={announce.getAuthor.getProfileLink} prefetch={false}>
                        <a className="decoration-none">
                            <img className="img-profile-wrapper rounded-circle"
                                src={announce.getAuthor.getAvatar}
                                alt={announce.getAuthor.getUsername}
                                width={30}
                            />
                        </a>
                    </Link>
                </div>
    
                <div className="d-flex ml-1 align-items-center">
                    <span className="mr-2">{announce.getAnnounceTitle}</span>
                </div>
            </div>

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
            
                <div className="d-flex">
                    <div className="mx-0 ml-2 icons-star-prof">
                        {alreadyLikeCurrentUser ? <StarSVGYellow/> : <StarSVG/>}
                        <span>{likesCounter}</span>
                    </div>
    
                    <div className="mx-0 ml-2 icons-star-prof">
                        <img src="/images/svg/comment.svg" alt=""/>
                        <span>{announce.getCountComments}</span>
                    </div>
                </div>
               
            </div>
            
            {announce.getFeaturedImg && (
                <div className="cardAd_Featured my-1">
                    <Link href={announce.getAnnounceLink} prefetch={false}>
                        <a>
                            <LazyLoadImage
                                effect="blur"
                                src={announce.getFeaturedImg.getLocation}
                                alt={announce.getFeaturedImg.getName}
                                height={200}
                                width="100%"
                            />
                        </a>
                    </Link>
                </div>
            )}

            {announce.getTags.length !== 0 && <TagsList tags={announce.getTags}/>}

            <div className="my-2 text-center">
                <CTALink
                    title={t('layout:see-announce')}
                    href={announce.getAnnounceLink}
                />
            </div>
        </div>
    )
}

AnnounceCardLight.propTypes = {
    announceRaw: PropTypes.any.isRequired,
    featuredImgHeight: PropTypes.number
}

AnnounceCardLight.defaultProps = {
    featuredImgHeight: 500
}
export default AnnounceCardLight
