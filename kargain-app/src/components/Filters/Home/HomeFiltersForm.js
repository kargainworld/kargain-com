import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import useAddress from '../../../hooks/useAddress'
import VehiclesService from '../../../services/VehiclesService'
import { MessageContext } from '../../../context/MessageContext'
import { vehicleTypes, vehicleTypeRefModels } from '../../../business/vehicleTypes'
import FieldWrapper from '../../Form/FieldWrapper'
import SelectInput from '../../Form/Inputs/SelectInput'
import SliderInput from '../../Form/Inputs/SliderInputUI'
import SelectCountryFlags from '../../Form/Inputs/SelectCountryFlags'
import SearchLocationInput from '../../Form/Inputs/SearchLocationInput'
import localeDataHelper from '../../../libs/localeDataHelper'

const HomeFiltersForm = ({ vehicleType, methods }) => {
    const cache = useRef({})
    const { t, lang } = useTranslation()
    const [, , coordinates] = useAddress()
    const isCar = vehicleType === vehicleTypes.car
    const vehicleTypeModel = vehicleTypeRefModels[vehicleType]
    const { control, errors, watch } = methods
    const countrySelect = watch('countrySelect')
    const selectedMake = watch('manufacturer.make')
    const selectedModel = watch('manufacturer.model')
    const { dispatchModalError } = useContext(MessageContext)
    const [manufacturersData, setManufacturersData] = useState({
        makes: [],
        models: [],
        generations: [],
        years: []
    })
    
    const [formData, setFormData] = useState({
        RadioChoicesGas: []
    })
    
    const getData = useCallback(async () => {
        try{
            const data = await localeDataHelper.getLocaleData(vehicleType, lang)
            setFormData(data)
        }catch (err){
            dispatchModalError({ err, persist : true})
        }
    },[lang, vehicleType])
    
    const fetchMakes = useCallback(async () => {
        const cacheKey = `${vehicleType}_makes`
        
        if(!cache.current[cacheKey]) {
            console.log('fetch makes')
            await VehiclesService.getMakes(vehicleTypeModel)
                .then(result => new Array(result))
                .then(makes => {
                    const makesOptions = makes.map(row => {
                        const { _id, make } = row
                        return {
                            value: _id,
                            label: make
                        }
                    })
                    
                    const defaultOption = {
                        value: 'other',
                        label: t('vehicles:i_dont_know_other')
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
        
    },[vehicleType, vehicleTypeModel])
    
    const fetchModels = useCallback(async ()=> {
        const make = selectedMake?.label
        const cacheKey = `${vehicleType}_makes_${make}_models`
        
        if (!make) return
        if(!cache.current[cacheKey]) {
            console.log('fetch models')
            const modelsService = isCar ? VehiclesService.getCarsDistinctModels
                : VehiclesService.getMakeModels
            
            await modelsService(vehicleTypeModel, make)
                .then(result => new Array(result))
                .then(models => {
                    let modelsOptions
                    
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
                        label: t('vehicles:i_dont_know_other')
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
    },[vehicleType, isCar, selectedMake])
    
    const fetchModelsYears = useCallback(async() => {
        const make = selectedMake?.value
        const model = selectedModel?.value
        const cacheKey = `${vehicleType}_makes_${make}_models_${model}`
        
        if (!make || !model) return
        if(!cache.current[cacheKey]) {
            console.log('fetch cars models years')
            await VehiclesService.getCarsMakeModelTrimYears(make, model)
                .then(result => new Array(result))
                .then(years => {
                    const yearsOptions = years.map(row => {
                        const { _id, year } = row
                        return {
                            value: _id,
                            label: year
                        }
                    })
                    
                    const defaultOption = {
                        value: 'other',
                        label: t('vehicles:i_dont_know_other')
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
    
    useEffect(() => {
        getData()
    }, [getData])
    
    useEffect(() => {
        control.register({ name: 'coordinates' })
        control.setValue('coordinates', coordinates)
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
        <Container>
            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:make')}>
                        <SelectInput
                            name="manufacturer.make"
                            control={control}
                            errors={errors}
                            options={manufacturersData.makes}
                        />
                    </FieldWrapper>
                </Col>
                
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:model')}>
                        <SelectInput
                            name="manufacturer.model"
                            options={manufacturersData.models}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.make')}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            
            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:year')}>
                        <SelectInput
                            name="manufacturer.year"
                            placeholder="Select year"
                            options={manufacturersData.years}
                            control={control}
                            errors={errors}
                            disabled={!watch('manufacturer.model') || !isCar}
                        />
                    </FieldWrapper>
                </Col>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:price')}>
                        <SliderInput
                            classNames="my-4 mt-2"
                            name="price"
                            min={0}
                            max={200000}
                            step={1000}
                            errors={errors}
                            control={control}
                            suffix="€"
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:mileage')}>
                        <SliderInput
                            classNames="my-4 mt-2"
                            name="mileage"
                            min={0}
                            max={200000}
                            step={1000}
                            errors={errors}
                            control={control}
                            suffix="km"
                        />
                    </FieldWrapper>
                </Col>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:gas')}>
                        <SelectInput
                            name="vehicleEngineGas"
                            className="mb-2"
                            options={formData.RadioChoicesGas}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
            
            <Row>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:country')}>
                        <SelectCountryFlags
                            name="countrySelect"
                            errors={errors}
                            control={control}
                        />
                    </FieldWrapper>
                </Col>
                <Col md={6}>
                    <FieldWrapper label={t('vehicles:address')}>
                        <SearchLocationInput
                            name="address"
                            country={countrySelect?.value}
                            errors={errors}
                            control={control}>
                        </SearchLocationInput>
                    </FieldWrapper>
                </Col>
            </Row>
        </Container>
    )
}

HomeFiltersForm.defaultProps = {
    vehicleType : 'car'
}

HomeFiltersForm.propTypes = {
    methods: PropTypes.object.isRequired
}

export default HomeFiltersForm
