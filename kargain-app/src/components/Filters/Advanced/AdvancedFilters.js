import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import FilterListIcon from '@material-ui/icons/FilterList'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTranslation from 'next-translate/useTranslation'
import { cleanObj } from '../../../libs/utils'
import filterProps from '../../../libs/filterProps'
import FiltersChanges from '../FiltersChanges'
import SelectInput from '../../Form/Inputs/SelectInput'
import FieldWrapper from '../../Form/FieldWrapper'
import { useAuth } from '../../../context/AuthProvider'
import { MessageContext } from '../../../context/MessageContext'
import vehicleTypesDefault, {vehicleTypes, vehicleTypeRefModels } from '../../../business/vehicleTypes.js'
import AnnounceTypes from '../../../business/announceTypes.js'
import VehiclesService from '../../../services/VehiclesService'
import SwitchFiltersVehicleType from './SwitchFiltersVehicleType'
import useAddress from '../../../hooks/useAddress'

const useStyles = makeStyles(() => ({
    filtersContainer: {
        padding: '.5rem'
    },

    filtersTop: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid gainsboro'
    },

    filtersHidden: {
        display: 'none'
    }
}))

const AdvancedFilters = ({ defaultFilters, updateFilters, vehicleType, setVehicleType }) => {
    const cache = useRef({})
    const classes = useStyles()
    const { t } = useTranslation()
    const isCar = vehicleType === vehicleTypes.car
    const [, , coordinates] = useAddress()
    const vehicleTypeModel = vehicleTypeRefModels[vehicleType]
    const { isAuthReady, authenticatedUser } = useAuth()
    const isMobile = useMediaQuery('(max-width:768px)')
    const { dispatchModalError } = useContext(MessageContext)
    const [hiddenForm, hideForm] = useState(true)
    const [changes, setChanges] = useState({})
    const DynamicFiltersComponent = SwitchFiltersVehicleType(vehicleType)
    const [announceTypesFiltered, setAnnouncesTypesFiltered] = useState(AnnounceTypes)
    const defaultValues = {
        ...defaultFilters,
        vehicleType : vehicleTypesDefault[0],
        adType : AnnounceTypes[0]
    }

    const {watch, register, control, setValue, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues
    })
    
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
        generations: [],
        years: []
    })
    
    const selectedMake = watch('manufacturer.make')
    const selectedModel = watch('manufacturer.model')

    const onSubmit = (form, e) => {
        const { coordinates, radius } = form
        const changes = cleanObj(form)
        const filtersFlat = filterProps(form)
        const data = { ...filtersFlat }

        if (coordinates && radius) {
            data.radius = radius
            data.coordinates = coordinates
            data.enableGeocoding = true
        }

        e.preventDefault()
        setChanges(changes)
        updateFilters(data)
    }

    const resetValue = (name) => {
        const defaultValue = defaultValues?.[name]
        setValue(name, defaultValue)
        setChanges(changes => {
            const { [name]: rm, ...rest } = changes
            return rest
        })
    }

    const toggleFilters = () => {
        hideForm(hiddenForm => !hiddenForm)
    }

    const fetchMakes = useCallback(async () => {
        const cacheKey = `${vehicleType}_makes`

        if(!cache.current[cacheKey]) {
            console.log('fetch makes')
            await VehiclesService.getMakes(vehicleTypeModel)
                .then(makes => {
                    if(!Array.isArray(makes)) makes = [makes]
                    const makesOptions = makes.map(make => ({
                        value: make._id,
                        label: make.make
                    }))

                    const defaultOption = {
                        value: 'other',
                        label: 'Je ne sais pas/Autre'
                    }

                    const data = [...makesOptions, defaultOption]
                    cache.current[cacheKey] = data

                    setManufacturersData(manufacturersData => (
                        {
                            ...manufacturersData,
                            makes: data
                        })
                    )
                })
                .catch(err => {
                    dispatchModalError({ err })
                })
        } else{
            setManufacturersData(manufacturersData => (
                {
                    ...manufacturersData,
                    makes: cache.current[cacheKey]
                })
            )
        }

    },[vehicleTypeModel])

    const fetchModels = useCallback(async ()=> {
        const make = selectedMake?.label
        const cacheKey = `${vehicleType}_makes_${make}_models`

        if (!make) return
        if(!cache.current[cacheKey]) {
            console.log('fetch models')
            const modelsService = isCar ? VehiclesService.getCarsDistinctModels
                : VehiclesService.getMakeModels

            await modelsService(vehicleTypeModel, make)
                .then(models => {
                    if(!Array.isArray(models)) models = [models]
                    let modelsOptions = []

                    if(isCar){
                        modelsOptions = models.map(model => ({
                            value: model,
                            label: model
                        }))
                    }
                    else {
                        modelsOptions = models.map(model => ({
                            value: model._id,
                            label: model.model
                        }))
                    }

                    const defaultOption = {
                        value: 'other',
                        label: 'Je ne sais pas/Autre'
                    }

                    const data = [...modelsOptions, defaultOption]
                    cache.current[cacheKey] = data

                    setManufacturersData(manufacturersData => (
                        {
                            ...manufacturersData,
                            models: data
                        })
                    )
                })
                .catch(err => {
                    dispatchModalError({
                        err,
                        persist: true
                    })
                })
        } else {
            setManufacturersData(manufacturersData => (
                {
                    ...manufacturersData,
                    models: cache.current[cacheKey]
                })
            )
        }
    },[selectedMake])

    const fetchModelsYears = useCallback(async() => {
        const make = selectedMake?.value
        const model = selectedModel?.value
        const cacheKey = `${vehicleType}_makes_${make}_models_${model}`

        if (!make || !model) return
        if(!cache.current[cacheKey]) {
            console.log('fetch cars models years')
            await VehiclesService.getCarsMakeModelTrimYears(make, model)
                .then(years => {
                    if(!Array.isArray(years)) years = [years]

                    const yearsOptions = years.map(year => ({
                        value: year._id,
                        label: year.year
                    }))

                    const defaultOption = {
                        value: 'other',
                        label: 'Je ne sais pas/Autre'
                    }

                    const data = [...yearsOptions, defaultOption]
                    cache.current[cacheKey] = data

                    setManufacturersData(manufacturersData => (
                        {
                            ...manufacturersData,
                            years: data
                        })
                    )
                })
                .catch(err => {
                    dispatchModalError({ err })
                })
        } else {
            setManufacturersData(manufacturersData => (
                {
                    ...manufacturersData,
                    years: cache.current[cacheKey]
                })
            )
        }
    },[vehicleTypeModel])

    useEffect(()=>{
        toggleFilters()
    },[isMobile])

    useEffect(()=>{
        const isPro = authenticatedUser.getIsPro
        if(!isPro) setAnnouncesTypesFiltered(types => types.filter(type => type.value !== 'sale-pro'))
    },[authenticatedUser, isAuthReady])

    useEffect(() => {
        register({ name: 'coordinates' })
        setValue('coordinates', coordinates)
    }, [coordinates])

    useEffect(() => {
        fetchMakes()
    }, [fetchMakes])

    useEffect(() => {
        const make = selectedMake?.label
        if (!make) return
        fetchModels()
    }, [selectedMake, fetchModels])

    useEffect(() => {
        const model = selectedModel?.label
        if (!model) return
        fetchModelsYears()
    }, [selectedModel, fetchModelsYears])

    return (
        <div className={classes.filtersContainer}>
            <div className={classes.filtersTop} onClick={() => toggleFilters()}>
                <Typography variant="h4">
                    {t('filters:select-filters')}
                    <i className={clsx('ml-2', 'arrow_nav', hiddenForm ? 'is-top' : 'is-bottom')}/>
                </Typography>
            </div>

            <FiltersChanges {...{changes, resetValue}} />

            <form className="filters_form" onSubmit={handleSubmit(onSubmit)}>
                <ControlButtons/>
    
                <div className={clsx(hiddenForm && classes.filtersHidden)}>
                    <FieldWrapper label={t('vehicles:vehicle-type')}>
                        <SelectInput
                            name="vehicleType"
                            control={control}
                            errors={errors}
                            options={vehicleTypesDefault}
                            onChange={selected =>{
                                setVehicleType(selected.value)
                                return selected
                            }}
                        />
                    </FieldWrapper>
    
                    <FieldWrapper label={t('vehicles:announce-type')}>
                        <SelectInput
                            name="adType"
                            control={control}
                            errors={errors}
                            options={announceTypesFiltered}
                            onChange={selected =>{
                                setVehicleType(selected.value)
                                return selected
                            }}
                        />
                    </FieldWrapper>
    
                    <FieldWrapper label={t('vehicles:make')}>
                        <SelectInput
                            name="manufacturer.make"
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
                        />
                    </FieldWrapper>
    
                    <FieldWrapper label={t('vehicles:model')}>
                        <SelectInput
                            name="manufacturer.model"
                            options={manufacturersData.models}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.make')}
                        />
                    </FieldWrapper>
    
                    <FieldWrapper label={t('vehicles:year')}>
                        <SelectInput
                            name="year"
                            placeholder="Select year"
                            options={manufacturersData.years}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.model') || !isCar}
                        />
                    </FieldWrapper>
    
                    {DynamicFiltersComponent && (
                        <DynamicFiltersComponent
                            control={control}
                            errors={errors}
                            watch={watch}
                        />
                    )}
                </div>
            </form>
        </div>
    )
}

const ControlButtons = () => {
    const { t } = useTranslation()

    return (
        <div className="d-flex flex-column my-3">
            <Button
                className="my-1"
                variant="contained"
                color="primary"
                startIcon={<FilterListIcon/>}
                type="submit"
            >
                {t('vehicles:apply-filters')}
            </Button>
        </div>
    )
}

AdvancedFilters.defaultProps = {
    vehicleType : vehicleTypesDefault[0].value
}

export default memo(AdvancedFilters)
