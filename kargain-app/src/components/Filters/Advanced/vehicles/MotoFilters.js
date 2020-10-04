import React, { memo, useCallback, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import SelectInput from '../../../Form/Inputs/SelectInput'
import SliderInput from '../../../Form/Inputs/SliderInputUI'
import SelectCountryFlags from '../../../Form/Inputs/SelectCountryFlags'
import SearchLocationInput from '../../../Form/Inputs/SearchLocationInput'
import FieldWrapper from '../../../Form/FieldWrapper'
import localeDataHelper from '../../../../libs/localeDataHelper'
import { vehicleTypes } from '../../../../business/vehicleTypes'
import { MessageContext } from '../../../../context/MessageContext'

const MotoFilters = ({ control, watch, errors }) => {
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
            const data = await localeDataHelper.getLocaleData(vehicleTypes.moto, lang)
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
                    classNames="my-4 mt-2"
                    name="price"
                    defaultValue={[0, 200000]}
                    min={0}
                    max={200000}
                    step={1000}
                    errors={errors}
                    control={control}
                    suffix="€"
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
                    defaultChecked={['Topcase', 'Kickstarter']}
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
    
            <FieldWrapper label={t('vehicles:vehicle-state')}>
                <SelectInput
                    name="vehicleGeneralState"
                    options={formData.RadioVehicleGeneralState}
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
            
        </>
    )
}

MotoFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
}

export default memo(MotoFilters)
