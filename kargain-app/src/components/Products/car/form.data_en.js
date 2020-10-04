import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';

export const RadioTypeFunction = [
    {
        label: 'Compact,',
        value: 'compact',
    },
    {
        label: 'Convertible',
        value: 'convertible',
    },
    {
        label: 'Cupcar',
        value: 'cupcar',
    },
    {
        label: 'SUV/4x4',
        value: 'suv',
    },
    {
        label: 'Sedan',
        value: 'sedan',
    },
    {
        label: 'Break',
        value: 'break',
    },
    {
        label: 'Minivan',
        value: 'minivan',
    },
    {
        label: 'Other',
        value: 'other',
    },
];

export const RadioFunctionVehicle = [
    {
        value: 'personal-car',
        label: 'Véhicule personel',
    },
    {
        value: 'driving-school-car',
        label: 'Véhicule auto-école',
    },
    {
        value: 'post-rental',
        label: 'Après location',
    },
    {
        value: 'cab',
        label: 'Taxi',
    },
    {
        value: 'company-vehicle',
        label: 'Véhicule de société',
    },
    {
        value: 'demo-vehicle',
        label: 'Véhicule de démonstration',
    },
    {
        value: 'Pre-save-vehicle',
        label: 'Pré-enregistré',
    },
];

export const RadioVehicleGeneralState = [
    {
        value: 'nine',
        label: 'New',
    },
    {
        value: 'occasion',
        label: 'Occasion',
    },
    {
        value: 'collection',
        label: 'Collection',
    },
    {
        value: 'school-driving-car',
        label: 'Automobile Driving School',
    },
    {
        value: 'after-rent',
        label: 'After Rent',
    },
    {
        value: 'taxi',
        label: 'Taxi',
    },
    {
        value: 'company-car',
        label: 'Employee’s Vehicle',
    },
    {
        value: 'demo-car',
        label: 'Demonstration Vehicle',
    },
];

export const RadioChoicesGas = [
    {
        label: 'Diesel',
        value: 'diesel',
    },
    {
        label: 'Gas',
        value: 'gas',
    },
    {
        label: 'Ethanol',
        value: 'ethanol',
    },
    {
        label: 'Electric',
        value: 'electric',
    },
    {
        label: 'Hybrid / gasoline',
        value: 'hybrid-gas',
    },
    {
        label: 'Hydrogen',
        value: 'hydrogen',
    },
    {
        label: 'Liquified petroleum gas (LPG),',
        value: 'gpl',
    },
];

export const RadioChoicesEngine = [
    {
        label: 'Automatic',
        value: 'automatic',
    },
    {
        label: 'Manual',
        value: 'manual',
    },
    {
        label: 'Semi-automatic',
        value: 'semi-auto',
    },
];

export const RadioChoicesEmission = SelectOptionsUtils(['EURO1', 'EURO2', 'EURO3', 'EURO4', 'EURO5', 'EURO6']);

export const CheckboxOptionsEquipments = SelectOptionsUtils([
    'ABS', 'Bluetooth', 'CD player', 'ESP', 'MP3', 'USB', 'Start / Stop system',
    'Electric tailgate', 'Adaptive Cruise Control', 'Traction control', 'Soundsystem',
    'Roof rack', 'Keyless central locking', 'Electric side mirrors', 'Side airbag', 'On- board computer',
    'Seat ventilation', 'Power steering', 'Rain sensor', 'Daylights running lights',
    'Immobilizer', 'Heads-up display', 'Automatic climate control', 'Leather steering wheel', 'Handsfree', 'Air conditioning',
    'Cruise control', 'Xenon headlights', 'Alloy wheels', 'Ski bag', 'Sunroof', 'Massage seats', 'Multifunction steering wheel',
    'Navigation system', 'Seat heating', 'Handicapped enabled', 'Lumbar support', 'Panorama roof',
    'Parking assist system camera', 'Parking assist system rear', 'Parking assist system front', 'Air suspension',
    'Adaptive headlights', 'Armrest', 'Auxiliary heating', 'Heated steering wheel', 'Shift paddles', 'Passenger-side airbag',
    'Driver-side airbag', '4WD', 'Trailer hitch', 'Fog lights', 'Radio', 'Light detector', 'LED daylight running lights',
    'LED headlights', 'Sliding door', 'Touchscreen', 'Alarm', 'Emergency system', 'Parking assist system self-steering',
    'Tire pressure monitoring system', 'Blind spot monitor', 'Driver drowsiness detection', 'Isofix', 'Night view assist',
    'Hill holder', 'Traffic sign recognition', 'Lane departure warning system', 'Emergency brake assistant', 'Sport suspension',
    'Sports seats', 'Sport Pack', 'Television', 'Voice control', 'Central door lock', 'Digital radio', 'Electrically adjustable seats',
    'Power windows', 'Electrically heated windshield',
]);

export const RadioChoicesExternalColor = [
    {
        value: 'black',
        label: 'Black',
    },
    {
        value: 'gray',
        label: 'Gray',
    },
    {
        value: 'white',
        label: 'White',
    },
    {
        value: 'vert',
        label: 'Vert',
    },
    {
        value: 'beige',
        label: 'Beige',
    },
    {
        value: 'gold',
        label: 'Gold',
    },
    {
        value: 'brown',
        label: 'Brown',
    },
    {
        value: 'orange',
        label: 'Orange',
    },
    {
        value: 'bronze',
        label: 'Bronze',
    },
    {
        value: 'purple',
        label: 'Purple',
    },
    {
        value: 'blue',
        label: 'Blue',
    },
    {
        value: 'red',
        label: 'Red',
    },
    {
        value: 'silver',
        label: 'Silver',
    },
    {
        value: 'yellow',
        label: 'Yellow',
    },
    {
        value: 'other',
        label: 'Other',
    },
];

export const RadioChoicesMaterials = [
    {
        value: 'Alcantre',
        label: 'alcantre',
    },
    {
        value: 'Cuir',
        label: 'cuir',
    },
    {
        value: 'Cuir partiel',
        label: 'Cuir-partiel',
    },
    {
        value: 'Tissu',
        label: 'tissu',
    },
    {
        value: 'Velours',
        label: 'velours',
    },
    {
        value: 'Autre',
        label: 'autre',
    },
];

export const RadioChoicesPaints = [{
    value: 'metalique',
    label: 'Métalique',
},
    {
        value: 'autre',
        label: 'Autre',
    },
];
