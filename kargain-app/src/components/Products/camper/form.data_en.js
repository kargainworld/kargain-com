import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'

export const RadioTypeFunction = [
    {
        label: 'Full',
        value: 'full'
    },
    {
        label: 'Mobile home',
        value: 'mobile-home'
    },
    {
        label: 'Caravan',
        value: 'caravan'
    },
    {
        label: 'Cabin',
        value: 'cabin'
    },
    {
        label: 'Mobile home/Pick-up',
        value: 'mobile-home-Pick-up'
    },
    {
        label: 'Other',
        value: 'other'
    }
]
export const RadioChoicesGas = [
    {
        label: 'Diesel',
        value: 'diesel'
    },
    {
        label: 'Gas',
        value: 'gas'
    },
    {
        label: 'Ethanol',
        value: 'ethanol'
    },
    {
        label: 'Electric',
        value: 'eletric'
    },
    {
        label: 'Hybrid / gasoline',
        value: 'hybrid-gas'
    },
    {
        label: 'Hydrogen',
        value: 'hydrogen'
    },
    {
        label: 'Liquified petroleum gas (LPG),',
        value: 'gpl'
    }
]
export const RadioChoicesEngine = [{
    label: 'Automatic',
    value: 'automatic'
},
{
    label: 'Manual',
    value: 'manual'
},
{
    label: 'Semi-automatic',
    value: 'semi-auto'
}
]
export const RadioChoicesEmission = SelectOptionsUtils(['EURO1', 'EURO2', 'EURO3', 'EURO4', 'EURO5', 'EURO6'])

export const SelectChoicesBrandsAPI = SelectOptionsUtils(['Audi', 'BMW', 'Mercedes', 'Peugeot', 'Renault', 'Fiat'])

export const CheckboxOptionsEquipments = SelectOptionsUtils([
    'ABS',
    'Airbag',
    'ESP',
    '4 WD',
    'Trailer hitch',
    'Handicapped enabled',
    'Onboard computer',
    'Onboard kitchen',
    'Differential lock',
    'Parking sensors',
    'Air conditioning',
    'Truck registration',
    'Awning',
    'Middle seating arrangement',
    'Navigation system',
    'Fog lights',
    'Car registration',
    'Satellite Antena',
    'Power assisted steering',
    'Seat heater',
    'Solar array',
    'Auxiliary heating',
    'Cruise Control',
    'Bathroom',
    'Traction control',
    'Immobilizer',
    'Central locking',
    'Additional headlights '
])

export const RadioChoicesExternalColor = [
    {
        value: 'black',
        label: 'Black'
    },
    {
        value: 'gray',
        label: 'Gray'
    },
    {
        value: 'white',
        label: 'White'
    },
    {
        value: 'vert',
        label: 'Vert'
    },
    {
        value: 'beige',
        label: 'Beige'
    },
    {
        value: 'gold',
        label: 'Gold'
    },
    {
        value: 'brown',
        label: 'Brown'
    },
    {
        value: 'orange',
        label: 'Orange'
    },
    {
        value: 'bronze',
        label: 'Bronze'
    },
    {
        value: 'purple',
        label: 'Purple'
    },
    {
        value: 'blue',
        label: 'Blue'
    },
    {
        value: 'red',
        label: 'Red'
    },
    {
        value: 'silver',
        label: 'Silver'
    },
    {
        value: 'yellow',
        label: 'Yellow'
    },
    {
        value: 'other',
        label: 'Other'
    }
]

export const RadioChoicesBeds = [
    {
        value: 'simple',
        label: 'Simple'
    },
    {
        value: 'double',
        label: 'Double'
    },
    {
        value: 'leaflet',
        label: 'Leaflet'
    },
    {
        value: 'inflatable',
        label: 'Inflatable'
    }
]

export const RadioChoicesPaints = [
    {
        value: 'metallic',
        label: 'Metallic'
    },
    {
        value: 'other',
        label: 'Other'
    }
]

export const RadioChoicesMaterials = [
    {
        value: 'Alcantre',
        label: 'alcantre'
    },
    {
        value: 'Cuir',
        label: 'cuir'
    },
    {
        value: 'Cuir partiel',
        label: 'Cuir-partiel'
    },
    {
        value: 'Tissu',
        label: 'tissu'
    },
    {
        value: 'Velours',
        label: 'velours'
    },
    {
        value: 'Autre',
        label: 'autre'
    }
]
export const RadioVehicleGeneralState = [{
    value: 'neuf',
    label: 'Neuf'
},
{
    value: 'occasion',
    label: 'Occasion'
},
{
    value: 'collection',
    label: 'Collection'
},
{
    value: 'school-driving-car',
    label: 'Véhicule auto-école'
},
{
    value: 'after-rental',
    label: 'Après location'
},
{
    value: 'taxi',
    label: 'Taxi'
},
{
    value: 'company-car',
    label: 'Véhicule de société'
},
{
    value: 'demo-car',
    label: 'Véhicule de démonstration'
}
]
