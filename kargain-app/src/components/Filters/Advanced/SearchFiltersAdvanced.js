import React, {   useState } from 'react';
import {  Container } from 'reactstrap'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AdvancedFilters from './AdvancedFilters';
import vehicleTypes from '../../../business/vehicleTypes.js'
import Tabs from '../../Tabs/Tabs'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
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

const SearchFiltersAdvanced = ({query, updateFilters}) => {
    const classes = useStyles()
    const [vehicleType, setVehicleType] = useState(vehicleTypes[0].value)

    return (
        <Container>
            {vehicleTypes.length !== 0 && (
                <Tabs
                    defaultActive={0}
                    handleClickTab={(index) => setVehicleType(vehicleTypes[index].value)}>
                    {vehicleTypes && vehicleTypes.map((tab, index) => {
                        const isActive = vehicleType === tab.value
                        return (
                            <Tabs.Item
                                key={index}
                                className={clsx(classes.vehicleType, isActive && classes.vehicleTypeActive)}
                                img={<img
                                    src={isActive ? `/images/${tab.imgSelected}` : `/images/${tab.img}`}
                                    alt={tab.label}
                                    title={tab.label}
                                    className={classes.img}
                                />}
                            >
                                <AdvancedFilters
                                    vehicleType={vehicleType}
                                    setVehicleType={setVehicleType}
                                    updateFilters={updateFilters}
                                    query={query}
                                />
                            </Tabs.Item>
                        )
                    })}
                </Tabs>
            )}
        </Container>
    )
}

export default React.memo(SearchFiltersAdvanced)
