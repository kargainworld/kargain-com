import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTranslation from 'next-translate/useTranslation'

const useStyles = makeStyles(() => ({
    root: {
        flex: 1
    },
    spec: {
        marginBottom: '4px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',

        '& span': {
            fontWeight: 700
        }
    }
}))

const CarInfos = ({ announce, enableThirdColumn }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const cols = enableThirdColumn ? 4 : 6
    
    return (
        <Row className="specs my-2 p-2">
            <Col sm={12} md={cols}>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:make')}: </span>
                        {announce.getManufacturer.make}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:model')}: </span>
                        {announce.getManufacturer.model}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:year')}: </span>
                        {announce.getManufacturer.year}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:version')}: </span>
                        {announce.getManufacturer.version}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:mileage')}: </span>
                        {announce.getMileage} km
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:gas')}: </span>
                        {announce.geVehicleEngineGas}
                    </Typography>
                </div>
            </Col>
            <Col sm={12} md={cols}>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:engine_type')}: </span>
                        {announce.geVehicleEngineType}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:cylinder')}: </span>
                        {announce.geVehicleEngineCylinder}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:power')}: </span>
                        {announce.getVehiclePowerCh}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Carte grise: </span>
                        {announce.getNationality}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:vehicle_function')}: </span>
                        {announce.getVehicleFunction}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>{t('vehicles:class_emission')}: </span>
                        {announce.getVehicleEmissionClass}
                    </Typography>
                </div>
            </Col>

            {enableThirdColumn && (
                <Col sm={12} md={cols}>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:vehicle_general_state')}: </span>
                            {announce.getVehicleGeneralState}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:doors_quantity')}: </span>
                            {announce.getVehicleDoors}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:seats_quantity')}: </span>
                            {announce.getVehicleSeats}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:external_color')}: </span>
                            {announce.getVehicleExternalColor}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:internal_color')}: </span>
                            {announce.getVehicleInternalColor}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:paint')}: </span>
                            {announce.getVehiclePaintColor}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:owners_quantity')}: </span>
                            {announce.getVehicleCountOwners}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>{t('vehicles:materials')}: </span>
                        </Typography>
                        <ul>
                            {announce.getVehicleMaterials && announce.getVehicleMaterials.map((material, i) => {
                                return (
                                    <li key={i}> {material.label}</li>
                                )
                            })}
                        </ul>
                    </div>
                </Col>
            )}
        </Row>
    )
}

CarInfos.propTypes = {
    announce: PropTypes.object.isRequired,
    responsiveCols: PropTypes.bool,
    enableThirdColumn: PropTypes.bool
}
export default memo(CarInfos)
