import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'

export const RadioTypeFunction = SelectOptionsUtils([
    'Bus', 'Poid lourd', 'Véhicule de voirie', 'Remorque', 'Chariot élévateur à fourche', 'Fourgon',
    'Semi-remorque', 'Tracteur routier', 'Machine construction', 'Machine agricole']
)

export const RadioChoicesFunction = [
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
    'ABS', 'Airbag', 'Grappins hydrauliques', 'Phares supplémentaires',
    'Retarder', 'Marteau hydraulique', 'Cuisine à bord', 'Fourches à palettes', 'Hydraulique',
    'Quatre roues motrices', 'Hayon élévateur', 'Toiture', 'Cabine', 'Déplacement latéral', 'Compresseur',
    'Climatisation', 'Grue', 'Régulateur de vitesse', 'Plateau pivotant', 'Remorque à hauteur de chargement accrue',
    'Chauffage auxiliaire', 'Chenilles en caoutchouc', 'Controle de tractions', 'Véhicule frigorifique', 'Attache remorque'
])

export const RadioChoicesExternalColor = [
    {
        value: 'noir',
        label: 'Noir'
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
        value: 'belge',
        label: 'Belge'
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
        value: 'gris',
        label: 'Gris'
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
