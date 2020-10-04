import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import useTranslation from 'next-translate/useTranslation'
import SelectInput from '../../../Form/Inputs/SelectInput'
import SliderInput from '../../../Form/Inputs/SliderInputUI'
import SelectCountryFlags from '../../../Form/Inputs/SelectCountryFlags'
import SearchLocationInput from '../../../Form/Inputs/SearchLocationInput'
import FieldWrapper from '../../../Form/FieldWrapper'
import localeDataHelper from '../../../../libs/localeDataHelper'
import { vehicleTypes } from '../../../../business/vehicleTypes'
import { MessageContext } from '../../../../context/MessageContext'

const CamperFilters = ({control, watch, errors }) => {
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
            const data = await localeDataHelper.getLocaleData(vehicleTypes.camper, lang)
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

            <Typography component="span">
                {t('vehicles:equipments')}
            </Typography>
            <SelectInput
                name="equipments"
                options={formData.CheckboxOptionsEquipments}
                isMulti
                defaultChecked={['ABS', 'ESP']}
                control={control}
                errors={errors}
            />

            <Typography component="span">
                {t('vehicles:class_emission')}
            </Typography>
            <SelectInput
                name="emission"
                options={formData.RadioChoicesEmission}
                control={control}
                errors={errors}
            />

            <Typography component="span" gutterBottom>
                {t('vehicles:co2-consumption')}
            </Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="consumptionGkm"
                defaultValue={[0, 200]}
                min={0}
                max={200}
                step={1}
                errors={errors}
                control={control}
                suffix="kw"
            />

            <Typography component="span" gutterBottom>
                {t('vehicles:doors_quantity')}
            </Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="seats"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">
                {t('vehicles:doors_quantity')}
            </Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="doors"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">
                {t('vehicles:bunks-quantity')}
            </Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="bunks"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">
                {t('seats:beds-quantity')}
            </Typography>
            <SliderInput
                classNames="my-4 mt-2"
                name="beds"
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                errors={errors}
                control={control}
            />

            <Typography component="span">
                {t('vehicles:beds-type')}
            </Typography>
            <SelectInput
                name="bedType"
                options={formData.RadioChoiceBeds}
                control={control}
                errors={errors}
            />

            <Typography component="span">
                {t('vehicles:paint')}
            </Typography>
            <SelectInput
                name="paint"
                options={formData.RadioChoicesPaints}
                control={control}
                errors={errors}
            />

            <Typography component="span">
                {t('vehicles:external_color')}
            </Typography>
            <SelectInput
                name="externalColor"
                options={formData.RadioChoicesMaterials}
                control={control}
                errors={errors}
            />

            <Typography component="span">
                {t('vehicles:internal_color')}
            </Typography>
            <SelectInput
                name="internalColor"
                options={formData.RadioChoicesExternalColor}
                control={control}
                errors={errors}
            />
        </>
    )
}

CamperFilters.propTypes = {
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func
}

export default CamperFilters
