module.exports = {
    TYPE_AD: {
        ref: 'adType',
        rule: 'strict'
    },
    VEHICLE_TYPE: {
        ref: 'vehicleType',
        rule: 'strict'
    },
    FN_USE: {
        ref: 'vehicleFunctionUse.value'
    },
    TYPE: {
        ref: 'vehicleTypeSelect.value'
    },
    AD_PRICE: {
        type: 'range',
        ref: 'price'
    },
    ENGINE_TYPE: {
        ref : 'vehicleEngineType.value'
    },
    ENGINE_GAS: {
        ref : 'vehicleEngineGas.value'
    },
    CYLINDER: {
        type: 'range',
        ref: 'vehicleEngineCylinder'
    },
    GENERAL_STATE: {
        ref: 'vehicleGeneralState.value'
    },
    ADDRESS_CITY_POSTCODE: {
        ref : 'address.city.postcode'
    },
    
    MILEAGE: {
        type: 'range',
        ref: 'mileage'
    },
    POWER_KW: {
        type: 'range',
        ref: 'powerKw',
        maxDisable : 400
    },
    CONSUMPTION_GKM: {
        type: 'range',
        ref: 'consumptionGkm'
    },
    DOORS: {
        type: 'range',
        ref: 'doors'
    },
    SEATS: {
        type: 'range',
        ref: 'seats'
    },
    BUNKS: {
        type: 'range',
        ref: 'seats'
    },
    DRIVER_CAB: {
        type: 'range',
        ref: 'driverCabin'
    },
    HOURS_USE: {
        type: 'range',
        ref: 'hoursOfUse'
    },
    EQUIPMENTS: {
        type: 'array',
        single: {}
    },
    BED_TYPE: {
        ref: 'bedType.value'
    },
    MATERIALS: {
        ref: 'materials.value'
    },
    EMISSION: {
        ref: 'emission.value'
    },
    PAINT: {
        ref: 'paint.value'
    },
    EXTERNAL_COLOR: {
        ref: 'externalColor.value'
    },
    INTERNAL_COLOR: {
        ref: 'internalColor.value'
    }
}



