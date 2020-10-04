import React, { useContext } from 'react'
import Link from 'next-translate/Link'
import { getLogoWhite } from '../libs/utils'
import useTranslation from 'next-translate/useTranslation'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import { useForm } from 'react-hook-form'
import { MessageContext } from '../context/MessageContext'
import UsersService from '../services/UsersService'

const Footer = () => {
    const { t } = useTranslation()
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const { register, handleSubmit } = useForm()

    const onSubmitNewsletter = (data) => {
        UsersService.subscribeNewsletter(data)
            .then(() => {
                if (data?.active) {
                    dispatchModal({ msg: 'You successfully suscribed to our newsletter' })
                } else {
                    dispatchModal({ msg: 'You successfully unsuscribed from our newsletter' })
                }
            })
            .catch(err => {
                dispatchModalError({ err })
            })
    }

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-map-marker-alt"/>
                                <div className="cta-text">
                                    <h4>{t('layout:find-us')}</h4>
                                    <span>1010 Avenue, sw 54321, chandigarh</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-phone"/>
                                <div className="cta-text">
                                    <h4>{t('layout:call-us')}</h4>
                                    <span>9876543210</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="far fa-envelope-open"/>
                                <div className="cta-text">
                                    <h4>{t('layout:mail-us')}</h4>
                                    <span>contact@kargain.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 mb-50">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <Link href="/">
                                        <a>
                                            <img src={getLogoWhite()} className="img-fluid" alt="logo"/>
                                        </a>
                                    </Link>
                                </div>
                                <div className="footer-text">
                                    <p>
                                        {t('layout:footer-text')}
                                    </p>
                                </div>
                                <div className="footer-social-icons">
                                    <span>{t('layout:follow-us')}</span>
                                    <a className="facebook-bg" target="_blank">
                                        <i><FacebookIcon/></i>
                                    </a>
                                    <a className="twitter-bg" target="_blank">
                                        <i><TwitterIcon/></i>
                                    </a>
                                    <a href="" className="instagram-bg" target="_blank">
                                        <i><InstagramIcon/></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>{t('layout:usefull-links')}</h3>
                                </div>
                                <ul>
                                    <li>
                                        <Link href="/static/contact">
                                            <a>Contact</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/static/about" prefetch={false}>
                                            <a>{t('layout:about-us')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/static/confidentiality" prefetch={false}>
                                            <a>{t('layout:privacy')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/static/conditions" prefetch={false}>
                                            <a>{t('layout:terms')}</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>{t('layout:newsletter')}</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>{t('layout:newsletter-text')}</p>
                                </div>
                                <div className="subscribe-form">
                                    <form onSubmit={handleSubmit(onSubmitNewsletter)}>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder={t('layout:email_address')}
                                            ref={register({ required: t('form_validations:required') })}
                                        />
                                        <input type="submit"
                                            style={{
                                                position: 'absolute',
                                                left: '-9999px'
                                            }}
                                        />
                                        <div className="submit">
                                            <button>{t('layout:subscribe')}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div className="copyright-text">
                                <p>Copyright &copy; Kargain 2020, All Right Reserved</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                            <div className="footer-menu">
                                <ul>
                                    <li>
                                        <Link href="/static/contact">
                                            <a>Contact</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/static/about" prefetch={false}>
                                            <a>{t('layout:about-us')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/static/confidentiality" prefetch={false}>
                                            <a>{t('layout:privacy')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/static/conditions" prefetch={false}>
                                            <a>{t('layout:terms')}</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
