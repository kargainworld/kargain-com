import React, { useState, useContext, useRef } from 'react'
import clsx from 'clsx'
import { Col, Container, Row } from 'reactstrap'
import { useRouter, withRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form'
import { FormContext } from '../../context/FormContext'
import { useAuth } from '../../context/AuthProvider'
import vehicleTypes from '../../business/vehicleTypes.js'
import AnnounceTypes from '../../business/announceTypes.js'
import ValidationErrors from '../../components/Form/Validations/ValidationErrors'

const path = require('path')

const useStyles = makeStyles(() => ({
    button: {
        padding: '1rem',
        border: '1px solid'
    }
}))

const Page = () => {
    const router = useRouter()
    const classes = useStyles()
    const formRef = useRef()
    const { t } = useTranslation()
    const { authenticatedUser } = useAuth()
    const [vehicleType, setVehicleType ] = useState()
    const { errors, register, handleSubmit, formState } = useForm({
        mode: "onChange"
    })

    const { dispatchFormUpdate } = useContext(FormContext)

    const handleSelectVehicleType = (index) => {
        const type = vehicleTypes[index]
        setVehicleType(type)
    }

    const onSubmit = (data) => {
        const { adType, vehicleType} = data
        const route = `${vehicleType.toLowerCase()}`
        dispatchFormUpdate({ adType, vehicleType })
        router.push(path.resolve(router.route, route))
    }

    return (
        <Container className="annonce1-wrapper-container">
            <form className="form_wizard my-4" ref={formRef} onSubmit={handleSubmit(onSubmit)}>

                <Typography component="h3" variant="h3" gutterBottom className="text-center">{t('vehicles:choose-vehicle-type')}</Typography>
                <Row className="justify-content-center">
                    {vehicleTypes && vehicleTypes.map((tab, index) => {
                        return (
                            <Col key={index} xs={6} sm={6} md={3} lg={3}>
                                <div className="form-check form-check-vehicle m-0" style={{ minHeight: '5rem' }}>
                                    <input id={`vehicle_type${index}`}
                                        type="radio"
                                        name="vehicleType"
                                        value={tab.value}
                                        ref={register({required : t('form_validations:field-is-required')})}
                                        onChange={() => handleSelectVehicleType(index)}
                                    />
                                    <label htmlFor={`vehicle_type${index}`} style={{ minHeight: '5rem' }}>
                                        <img src={vehicleType === tab.value ? `/images/${tab.imgSelected}` : `/images/${tab.img}`}
                                            alt={tab.label}
                                            title={tab.label}
                                            style={{maxWidth:'80px', objectFit: 'contain' }}
                                        />
                                    </label>
                                </div>
                            </Col>
                        )
                    })}
                </Row>

                <Typography component="h3" variant="h3" gutterBottom className="text-center">{t('vehicles:announce-type')}</Typography>
                <Row className="justify-content-center">
                    {AnnounceTypes && AnnounceTypes
                        .filter(type => {
                            if(!authenticatedUser.getIsPro) return type.value !== "sale-pro"
                            return true
                        })
                        .map((tab, index) => {
                            return (
                                <Col key={index} xs={12} sm={4} md={3} lg={4}>
                                    <div className="form-check-transparent"
                                        style={{ minHeight: '5rem' }}>
                                        <input id={`ad_type${index}`}
                                            type="radio"
                                            name="adType"
                                            value={tab.value}
                                            ref={register({required : t('form_validations:field-is-required')})}
                                        />
                                        <label htmlFor={`ad_type${index}`}>{tab.label}</label>
                                    </div>
                                </Col>
                            )
                        })}
                </Row>

                <Row className="justify-content-center">
                    <button className={clsx('btn', classes.button)}
                        type="submit"
                        disabled={!formState.isValid}>
                        {t('vehicles:next')}
                    </button>
                </Row>

                {errors && <ValidationErrors errors={errors}/>}
            </form>
        </Container>
    )
}

export default withRouter(Page)
