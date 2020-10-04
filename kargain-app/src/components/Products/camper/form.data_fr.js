import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'

export const RadioTypeFunction = [
    {
        label: 'Intégrale',
        value: 'full'
    },
    {
        label: 'Mobile home',
        value: 'mobile-home'
    },
    {
        label: 'Caravane',
        value: 'caravan'
    },
    {
        label: 'Cabine',
        value: 'cabin'
    },
    {
        label: 'Mobile home/Pick-up',
        value: 'mobile-home-Pick-up'
    },
    {
        label: 'Autre',
        value: 'other'
    }
]
export const RadioChoicesGas = [
    {
        label: 'Diesel',
        value: 'diesel'
    },
    {
        label: 'Essence',
        value: 'gas'
    },
    {
        label: 'Éthanol',
        value: 'ethanol'
    },
    {
        label: 'Electrique',
        value: 'eletric'
    },
    {
        label: 'Hybride diesel',
        value: 'hybride-gas'
    },
    {
        label: 'Hydrogène',
        value: 'hydrogen'
    },
    {
        label: 'Monospace',
        value: 'minivan'
    },
    {
        label: 'Gaz compressé (GPL)',
        value: 'gpl'
    }
]
export const RadioChoicesEngine = [
    {
        label: 'Automatique',
        value: 'automatic'
    },
    {
        label: 'Manuelle',
        value: 'manual'
    },
    {
        label: 'Semi-automatique',
        value: 'semi-auto'
    }
]
export const RadioChoicesEmission = SelectOptionsUtils(['EURO1', 'EURO2', 'EURO3', 'EURO4', 'EURO5', 'EURO6'])

export const SelectChoicesBrandsAPI = SelectOptionsUtils(['Audi', 'BMW', 'Mercedes', 'Peugeot', 'Renault', 'Fiat'])

export const CheckboxOptionsEquipments = SelectOptionsUtils([
    'ABS',
    'ESP',
    'Blocage différentiel',
    'Climatisation',
    'Airbag',
    'Cuisine à bord',
    '4x4',
    'Attache remorque',
    'Ordinateur de bord',
    'Equipement handicapé',
    'Radar de stationnement',
    'Enregistrement camion',
    'Auvent',
    'Dînette',
    'Système de navigation',
    'Feux anti-brouillard',
    'Enregistrement voiture',
    'Antenne satellite',
    'Direction assistée',
    'Siege chauffant',
    'Panneau solaire',
    'Chauffage auxiliaire',
    'Régulateur de vitesse',
    'Phares supplémentaires',
    'WC',
    'Contrôle de tractions',
    'Verrouillage central',
    'Anti-demarrage'
])
export const RadioChoicesExternalColor = [
    {
        value: 'noir',
        label: 'Noir'
    },
    {
        value: 'gris',
        label: 'Gris'
    },
    {
        value: 'blanc',
        label: 'Blanc'
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
        value: 'doré',
        label: 'Doré'
    },
    {
        value: 'marron',
        label: 'Marron'
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
        value: 'violet',
        label: 'Violet'
    },
    {
        value: 'bleu',
        label: 'Bleu'
    },
    {
        value: 'rouge',
        label: 'Rouge'
    },
    {
        value: 'argent',
        label: 'Argent'
    },
    {
        value: 'jaune',
        label: 'Jaune'
    },
    {
        value: 'autre',
        label: 'Autre'
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
export const RadioVehicleGeneralState = [
    {
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
        label: 'Dépliant'
    },
    {
        value: 'inflatable',
        label: 'Gonflable'
    }
]

export const RadioChoicesPaints = [
    {
        value: 'metalique',
        label: 'Métalique'
    },
    {
        value: 'autre',
        label: 'Autre'
    }
]
