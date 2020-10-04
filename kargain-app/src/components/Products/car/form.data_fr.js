import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'

export const RadioTypeFunction = [
    {
        label: 'Citadine',
        value: 'compact'
    },
    {
        label: 'Cabriolet',
        value: 'convertible'
    },
    {
        label: 'Coupé',
        value: 'cupcar'
    },
    {
        label: 'SUV/4x4',
        value: 'suv'
    },
    {
        label: 'Berline',
        value: 'sedan'
    },
    {
        label: 'Break',
        value: 'break'
    },
    {
        label: 'Monospace',
        value: 'minivan'
    },
    {
        label: 'Autre',
        value: 'other'
    }
]

export const RadioFunctionVehicle = [
    {
        value: 'personal-car',
        label: 'Véhicule personel'
    },
    {
        value: 'driving-school-car',
        label: 'Véhicule auto-école'
    },
    {
        value: 'post-rental',
        label: 'Après location'
    },
    {
        value: 'cab',
        label: 'Taxi'
    },
    {
        value: 'company-vehicle',
        label: 'Véhicule de société'
    },
    {
        value: 'demo-vehicle',
        label: 'Véhicule de démonstration'
    },
    {
        value: 'Pre-save-vehicle',
        label: 'Pré-enregistré'
    }
]


export const RadioVehicleGeneralState = [
    {
        value: 'nine',
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
        value: 'after-rent',
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
        value: 'electric'
    },
    {
        label: 'Hybride diesel',
        value: 'hybrid-gas'
    },
    {
        label: 'Hydrogène',
        value: 'hydrogen'
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

export const CheckboxOptionsEquipments = SelectOptionsUtils([
    'ABS', 'ESP', 'Régulateur de vitesse adaptatif', 'Soundsystem', 'Bluetooth', 'Hayon arrière électrique',
    'CD', 'MP3', 'Start/Stop automatique', 'USB', 'Anti-patinage', 'Porte-bagages', 'Verrouillage centralisé sans clé',
    'Rétroviseurs latéraux électriques', 'Airbags latéraux', 'Ordinateur de bord', 'Sieges ventilés', 'Direction assistée',
    'Détecteur de pluie', 'Phares de jour', 'Vitres électriques', 'Anti-démarrage', 'Affichage tête haute', 'Jantes alliages',
    'Toit ouvrant', 'Climatisation automatique', 'Phares au xénon', 'Volant en cuir', 'Kit mains libres', 'Régulateur de vitesses',
    'Climatisation', 'Tappe de ski', 'Sièges massants', 'Volant multifonctions', 'Système de navigation', 'Sieges chauffants',
    'Equipement handicapé', 'Sièges à réglage lombaire', 'Toit panoramique', 'Camera d’aide au stationnement',
    'Radar de stationnement arrière', 'Pare-brise chauffant', 'Radar de stationnement avant', 'Suspension pneumatique',
    'Airbag conducteur', 'Attache remorque', 'Phares directionnels', 'Airbag passager', 'Accoudoir', 'Chauffage auxiliaire',
    'Pétales de changement de vitesse', 'Volant chauffant', '4x4', 'Feux antibrouillard', 'Radio', 'Détecteur de lumière',
    'LED phare de jour', 'Phares au LED', 'Porte coulissante', 'Écran tactile', 'Alarme',
    'Le système d’appel d’urgence'
])

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
        value: 'other',
        label: 'Autre'
    }
]
