import CarFilters from './vehicles/CarFilters'
import MotoFilters from './vehicles/MotoFilters'
import CamperFilters from './vehicles/CamperFilters'
import UtilityFilters from './vehicles/UtilityFilters'

export default function SwitchFiltersVehicleType (type) {
    switch (type) {
    case 'car' :
        return CarFilters
    case 'camper' :
        return CamperFilters
    case 'utility' :
        return UtilityFilters
    case 'moto':
        return MotoFilters
    default:
        return CarFilters
    }
}
