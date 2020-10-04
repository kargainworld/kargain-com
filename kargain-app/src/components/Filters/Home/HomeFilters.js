import React, { useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { Col, Row } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import filterProps from '../../../libs/filterProps'
import vehicleTypes from '../../../business/vehicleTypes.js'
import AnnounceTypes from '../../../business/announceTypes.js'
import { useAuth } from '../../../context/AuthProvider'
import HomeFiltersForm from './HomeFiltersForm'
import CTAButton from '../../CTAButton'
import CTALink from '../../CTALink'

const useStyles = makeStyles(() => ({
    vehicleType: {
        border: 'none',
        borderBottom: '4px solid #c2bdbd',
        borderRadius: 0,
        color: '#c2bdbd',
        textAlign: 'center',
        textDecoration: 'none',
        margin: '0 1px'
    },

    vehicleTypeActive : {
        border: 'none',
        color: '#569ffc',
        textAlign: 'center',
        background: 'none',
        borderBottom: '4px solid #569ffc'
    },

    img: {
        marginBottom: '7px',
        marginTop: '2px',
        maxWidth: '80px',
        objectFit: 'contain',
        height: '30px'
    }
}))

const HomeFilters = ({ updateFilters, totalResult }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const { authenticatedUser } = useAuth()
    const [vehicleType, setVehicleType] = useState(vehicleTypes[0].value)
    const methods = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues : {
            adType : "sale"
        }
    })

    const { errors, register, handleSubmit } = methods

    const onSubmit = (form, e) => {
        const { coordinates, radius } = form
        const filtersFlat = filterProps(form)
        const data = { ...filtersFlat }

        if (coordinates && radius) {
            data.radius = radius
            data.coordinates = coordinates
            data.enableGeocoding = true
        }

        e.preventDefault()
        updateFilters(data)
    }

    return(
        <form className="form_wizard my-4" onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-center">
                {vehicleTypes && vehicleTypes.map((tab, index) => {
                    const isActive = vehicleType === tab.value
                    return (
                        <Col key={index} xs={6} sm={3} md={3} lg={3}>
                            <div
                                onClick={() => { setVehicleType(tab.value)}}
                                className={clsx(classes.vehicleType, isActive && classes.vehicleTypeActive)}
                            >
                                <img
                                    src={isActive ? `/images/${tab.imgSelected}` : `/images/${tab.img}`}
                                    alt={tab.label}
                                    title={tab.label}
                                    className={classes.img}
                                />
                            </div>
                        </Col>
                    )
                })}
            </Row>

            <Row className="justify-content-center">
                {AnnounceTypes && AnnounceTypes
                    .filter(type => {
                        if(!authenticatedUser.getIsPro) return type.value !== "sale-pro"
                        return true
                    })
                    .map((tab, index) => {
                        return (
                            <Col key={index} xs={6} sm={3} md={3} lg={4}>
                                <div
                                    className="form-check-transparent"
                                    style={{ minHeight: '5rem' }}>
                                    <input id={`ad_type${index}`}
                                        type="radio"
                                        name="adType"
                                        value={tab.value}
                                        ref={register}
                                    />
                                    <label htmlFor={`ad_type${index}`}>
                                        <Typography component="h3" variant="h3">
                                            {tab.label}
                                        </Typography>
                                    </label>
                                </div>
                            </Col>
                        )
                    })}
            </Row>

            <HomeFiltersForm
                vehicleType={vehicleType}
                methods={methods}
            />

            {Object.keys(errors).length !== 0 && (
                <Alert severity="warning" className="mb-2">
                    {t('vehicles:correct-errors')}
                </Alert>
            )}

            <Row style={{width: "fitContent", margin: "0 auto", justifyContent : "center" }}>
                <div className="submit mx-2">
                    <CTALink href="/advanced-search" title="Recherche avancée"/>
                </div>

                <div className="submit mx-2">
                    <CTAButton submit title={t('vehicles:show_results_({count})', {count : totalResult})}/>
                </div>
            </Row>
        </form>
    )
}

export default HomeFilters
