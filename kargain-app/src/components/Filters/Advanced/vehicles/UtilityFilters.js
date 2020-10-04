import React, { useEffect, useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import SelectInput from '../../../Form/Inputs/SelectInput'
import SliderInput from '../../../Form/Inputs/SliderInputUI'
import SelectCountryFlags from '../../../Form/Inputs/SelectCountryFlags'
import SearchLocationInput from '../../../Form/Inputs/SearchLocationInput'
import FieldWrapper from '../../../Form/FieldWrapper'
import { SelectOptionsUtils } from '../../../../libs/formFieldsUtils'
import localeDataHelper from '../../../../libs/localeDataHelper'
import { vehicleTypes } from '../../../../business/vehicleTypes'
import { MessageContext } from '../../../../context/MessageContext'

const UtilityFilters = ({ control, watch, errors }) => {
    const { t, lang } = useTranslation()
    const countrySelect = watch('countrySelect')
    const { dispatchModalError } = useContext(MessageContext)
    const [formData, setFormData] = useState({
        RadioVehicleGeneralState: [],
        CheckboxOptionsEquipments: [],
        RadioChoicesGas: [],
        RadioFunctionVehicle: [],
        RadioTypeFunction: [],
        RadioChoicesEngine: [],
        RadioChoicesEmission: [],
        RadioChoiceBeds: [],
        RadioChoicesPaints: [],
        RadioChoicesMaterials: [],
        RadioChoicesExternalColor: []
    })
    
    const getData = useCallback(async () => {
        try{
            const data = await localeDataHelper.getLocaleData(vehicleTypes.utility, lang)
            setFormData(data)
        }catch (err){
            dispatchModalError({ err, persist : true})
        }
    },[lang])
    
    useEffect(() => {
        getData()
    }, [getData])
    
    return (
        <>
            <FieldWrapper label={t('vehicles:price')}>
                <SliderInput
                    name="price"
                    defaultValue={[1000, 50000]}
                    min={0}
                    max={200000}
                    step={1000}
                    errors={errors}
                    control={control}
                    suffix="€"
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:gear-box')}>
                <SelectInput
                    name="vehicleEngineType"
                    options={formData.RadioTypeFunction}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:gas')}>
                <SelectInput
                    name="vehicleEngineGas"
                    className="mb-2"
                    options={formData.RadioChoicesGas}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:cylinder')}>
                <SliderInput
                    name="vehicleEngineCylinder"
                    suffix="cm3"
                    min={10}
                    max={1000}
                    step={10}
                    defaultValue={[1, 1000]}
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>
            
            <FieldWrapper label={t('vehicles:mileage')}>
                <SliderInput
                    name="mileage"
                    min={0}
                    max={200000}
                    step={1000}
                    errors={errors}
                    control={control}
                    suffix="km"
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:power')}>
                <SliderInput
                    name="powerKw"
                    min={0}
                    max={200}
                    step={1}
                    errors={errors}
                    control={control}
                    suffix="kw"
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:country')}>
                <SelectCountryFlags
                    name="countrySelect"
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:address')}>
                <SearchLocationInput
                    name="address"
                    country={countrySelect?.value}
                    control={control}
                    errors={errors}>
                </SearchLocationInput>
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:radius')}>
                <SliderInput
                    name="radius"
                    min={0}
                    max={500}
                    step={5}
                    control={control}
                    errors={errors}
                    suffix="km"
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:equipments')}>
                <SelectInput
                    name="equipments"
                    options={formData.CheckboxOptionsEquipments}
                    isMulti
                    defaultChecked={['ABS', 'ESP']}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:class_emission')}>
                <SelectInput
                    name="emission"
                    options={formData.RadioChoicesEmission}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:co2-consumption')}>
                <SliderInput
                    name="consumptionGkm"
                    min={0}
                    max={200}
                    step={1}
                    errors={errors}
                    control={control}
                    suffix="kw"
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:doors_quantity')}>
                <SliderInput
                    name="doors"
                    min={1}
                    max={10}
                    step={1}
                    errors={errors}
                    control={control}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:driver-cabins')}>
                <SelectInput
                    name="driverCabins"
                    options={SelectOptionsUtils([2, 3, 4, 5])}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:doors_quantity')}>
                <SelectInput
                    name="doors"
                    options={SelectOptionsUtils([2,3,4,5,6,7,8,9])}
                    placeholder="Select number of doors"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:seats_quantity')}>
                <SelectInput
                    name="seats"
                    options={SelectOptionsUtils([2,3,4,5,6,7,8,9])}
                    placeholder="Select number of seats"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:paint')}>
                <SelectInput
                    name="paint"
                    control={control}
                    options={formData.RadioChoicesPaints}
                    citycontrol={control}
                    errors={errors}
                />
            </FieldWrapper>
            
            <FieldWrapper label={t('vehicles:external_color')}>
                <SelectInput
                    name="externalColor"
                    options={formData.RadioChoicesMaterials}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:internal_color')}>
                <SelectInput
                    name="internalColor"
                    options={formData.RadioChoicesMaterials}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
        </>
    )
}

UtilityFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
}

export default UtilityFilters
