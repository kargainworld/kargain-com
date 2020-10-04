import { SelectOptionsUtils } from '../../../libs/formFieldsUtils';

export const RadioTypeFunction = [
    {
        label: 'Chopper',
        value: 'chopper',
    },
    {
        label: 'Cruiser',
        value: 'cruiser',
    },
    {
        label: 'Touring',
        value: 'touring',
    },
    {
        label: 'Quad',
        value: 'quad',
    },
    {
        label: 'Snowmobile',
        value: 'snowmobile',
    },
    {
        label: 'Moto-sport',
        value: 'moto-sport',
    },
    {
        label: 'Mini bike',
        value: 'mini-bike',
    },
    {
        label: 'Scooter',
        value: 'scooter',
    },
    {
        label: 'Sport Bike,',
        value: 'sport-bike,',
    },
    {
        label: 'Other',
        value: 'other',
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
export const CheckboxOptionsEquipments = SelectOptionsUtils([

    'ABS', 'Bluetooth',
    'CD', 'MP3', 'USB', 'Start / Stop system',
    'Cruise Control', 'Soundsystem',
    'Windshield', 'Travel bags', 'Catalytic converter', 'Kickstarter',
    'Topcase', 'Seat Heating', 'Handicapped enabled', 'Passenger folder',
    'Grips heating', 'Crash bar', 'Trailer hitch', 'Alarm', 'Wide tire kit',
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

export const RadioChoicesPaints = [
    {
        value: 'metallic',
        label: 'Metallic',
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

export const RadioVehicleGeneralState = SelectOptionsUtils([
    'Neuve',
    'Occasion',
    'Collection',
    'Véhicule auto-école',
    'Après location',
    'Taxi',
    'Véhicule de société',
    'Véhicule de démonstration',
    'Pré-enregistré',
]);
