import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { inflate } from 'flattenjs'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Col,  Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Alert from '@material-ui/lab/Alert'
import { themeColors } from '../../../theme/palette'
import resolveObjectKey from '../../../libs/resolveObjectKey'
import { SelectOptionsUtils } from '../../../libs/formFieldsUtils'
import localeDataHelper from '../../../libs/localeDataHelper'
import AnnounceModel from '../../../models/announce.model'
import {vehicleTypes} from '../../../business/vehicleTypes'
import { MessageContext } from '../../../context/MessageContext'
import AnnounceService from '../../../services/AnnounceService'
import FieldWrapper from '../../../components/Form/FieldWrapper'
import TagsControlled from '../../../components/Tags/TagsControlled'
import TextareaInput from '../../../components/Form/Inputs/TextareaInput'
import AnnounceImagesAutoUpload from '../../../components/Uploads/AnnounceImagesAutoUpload'
import DamageSelectorControlled from '../../../components/Damages/DamageSelectorControlled'
import TextInput from '../../../components/Form/Inputs/TextInput'
import NumberInput from '../../../components/Form/Inputs/NumberInput'
import SelectInput from '../../../components/Form/Inputs/SelectInput'
import SelectCountryFlags from '../../../components/Form/Inputs/SelectCountryFlags'
import CheckboxMUI from '../../../components/Form/Inputs/CheckboxMUI'
import CheckboxGroup from '../../../components/Form/Inputs/CheckboxGroup'
import SearchLocationInput from '../../../components/Form/Inputs/SearchLocationInput'
import GalleryViewer from '../../../components/Gallery/GalleryViewer'
import GalleryImgsLazy from '../../../components/Gallery/GalleryImgsLazy'
import ValidationErrors from '../../../components/Form/Validations/ValidationErrors'
import CTALink from '../../../components/CTALink'
import Error from '../../_error'

const useStyles = makeStyles(() => ({

    stickyNav: {
        position: 'fixed',
        top: '5rem'
    },

    nav: {
        padding: 0,
        width: '100%',
        maxWidth: '260px'
    },

    navMobile: {
        display: 'flex'
    },

    button: {
        margin: '1rem'
    },

    buttonRemove: {
        backgroundColor : themeColors.red,

        "&:hover" : {
            backgroundColor : themeColors.red
        }
    },

    navList: {
        width: '100%',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
        borderRadius: '20px'
    },

    navItem: {
        border: 'none',
        padding: '1rem',
        borderRadius: 0,
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'all .2s ease-in-out',
        cursor: 'pointer',

        '&.active': {
            fontWeight: '700',
            border: 'none',
            borderBottom: `4px solid ${themeColors.blue}`,
            color: themeColors.blue,
            textAlign: 'center',
            background: 'none'
        },

        '&:last-child': {
            borderBottom: 'unset!important'
        }
    },

    formRow: {
        display: 'flex',

        '& > div': {
            margin: '1rem',
            flex: 1
        }
    },

    priceStarsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '15px 0'
    },

    wysiwyg: {
        margin: '1rem',
        padding: '1rem',
        border: '1px solid gainsboro',
        borderRadius: '5px'
    },

    damages: {
        width: '100%',
        margin: '2rem 1rem'
    }
}))

const allowedFields = {
    title: 'title',
    showCellPhone: 'showCellPhone',
    visible: 'visible',
    published: 'published',
    status: 'status',
    description: 'description',
    price: 'price',
    vehicleFunctionType: 'vehicleFunctionType',
    vehicleFunctionUse: 'vehicleFunctionUse',
    vehicleGeneralState: 'vehicleGeneralState',
    vehicleFunction: 'vehicleFunction',
    'vehicleEngineType': 'vehicleEngineType',
    'vehicleEngineGas': 'vehicleEngineGas',
    'vehicleEngineCylinder': 'vehicleEngineCylinder',
    'powerKm': 'powerKm',
    'powerCh': 'powerCh',
    'consumptionMixt': 'consumptionMixt',
    'consumptionCity': 'consumptionCity',
    'consumptionRoad': 'consumptionRoad',
    'consumptionGkm': 'consumptionGkm',
    mileage: 'mileage',
    equipments: 'equipments',
    damages: 'damages',
    doors: 'doors',
    seats: 'seats',
    driverCabins: 'driverCabins',
    bunks: 'bunks',
    beds: 'beds',
    bedType: 'bedType',
    paint: 'paint',
    materials: 'materials',
    externalColor: 'externalColor',
    internalColor: 'internalColor',
    emission: 'emission',
    images: 'images',
    tags: 'tags',
    'address.label': 'address.fullAddress',
    'address.value.housenumber': 'address.housenumber',
    'address.value.name': 'address.street',
    'address.value.postcode': 'address.postCode',
    'address.value.country': 'address.country',
    'address.value.city': 'address.city'
}

const AnnounceEdit = () => {
    const formRef = useRef()
    const theme = useTheme()
    const router = useRouter()
    const { slug } = router.query
    const [activeTab, setActiveTab] = useState(0)
    const { t } = useTranslation()

    const [state, setState] = useState({
        err : null,
        stateReady : false,
        isSelf : false,
        isAdmin : false,
        announce : new AnnounceModel(),
        likesCounter : 0
    })

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    })

    const toggleTab = (tabIndex) => {
        if (activeTab !== tabIndex) {
            setActiveTab(tabIndex)
        }
    }

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'))
        window.scrollTo(0, 0)
    }

    const fetchAnnounce = useCallback(async () => {
        try{
            const result = await AnnounceService.getAnnounceBySlug(slug)
            const { announce, isAdmin, isSelf } = result
    
            console.log(result)
            
            setState(state => ({
                ...state,
                stateReady : true,
                announce : new AnnounceModel(announce),
                isAdmin,
                isSelf
            }))
        } catch (err) {
            setState(state => ({
                ...state,
                stateReady: true,
                err
            }))
        }
    },[slug])

    useEffect(()=>{
        fetchAnnounce()
    },[fetchAnnounce])

    if (!state.stateReady) return null
    if (state.err) return <Error statusCode={state.err?.statusCode}/>

    return (
        <>
            {!isDesktop && (
                <NavMobile {...{
                    activeTab,
                    toggleTab
                }}/>
            )}

            <Row className="justify-content-center">
                {isDesktop && (
                    <Col sm="12" md="3" lg="3">
                        <NavDesktop {...{
                            activeTab,
                            toggleTab,
                            triggerSubmit,
                            slug
                        }}/>
                    </Col>
                )}

                <Col sm="12" md="9" lg="9">

                    {state.isAdmin && (
                        <Alert severity="info" className="mb-2">
                            Connected as Admin
                        </Alert>
                    )}

                    <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                        {t('vehicles:edit-announce')}
                    </Typography>

                    <MultiTabsForm {...{
                        formRef,
                        activeTab,
                        slug,
                        announce : state.announce,
                        defaultValues : {
                            ...state.announce.getRaw
                        }
                    }}/>
                </Col>
            </Row>

            {!isDesktop && (
                <Buttons
                    triggerSubmit={triggerSubmit}
                    announcePageLink={`/announces/${state.announce.getSlug}`}
                />
            )}
        </>
    )
}

const MultiTabsForm = ({ announce, formRef, activeTab, slug, defaultValues }) => {
    const refImg = useRef()
    const theme = useTheme()
    const { t, lang } = useTranslation()
    const vehicleType = announce.getVehicleType
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    })

    const { watch, control, register, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues
    })
    
    const [formData, setFormData] = useState({
        RadioVehicleGeneralState: [],
        CheckboxOptionsEquipments: [],
        RadioChoicesGas: [],
        RadioFunctionVehicle: [],
        RadioTypeFunction: [],
        RadioChoicesEngine: [],
        RadioChoicesEmission: [],
        RadioChoicesPaints: [],
        RadioChoicesMaterials: [],
        RadioChoicesExternalColor: []
    })
    
    const getData = useCallback(async () => {
        try{
            const data = await localeDataHelper.getLocaleData(vehicleType, lang)
            setFormData(data)
        }catch (err){
            dispatchModalError({ err, persist : true})
        }
    },[vehicleType, lang])
    
    useEffect(() => {
        getData()
    }, [getData])
    
    const onSubmit = (form) => {
        const updates = inflate(Object.keys(allowedFields).reduce((carry, key) => {
            const value = resolveObjectKey(form, key)
            if (value) {
                return {
                    ...carry,
                    [allowedFields[key]]: value
                }
            } else {
                return carry
            }
        }, {}))

        AnnounceService.updateAnnounce(slug, updates)
            .then(() => {
                dispatchModal({
                    msg: 'Ad successfully updated', persist : true
                })
            }).catch(err => {
                dispatchModalError({ err })
            })
    }

    const handleRemove = () => {
        AnnounceService.removeAnnounce(slug)
            .then(() => {
                dispatchModal({ msg: 'Announce successfully removed' })
            }).catch(err => {
                dispatchModalError({ err })
            })
    }

    const handleCLickImg = (index) => {
        if (refImg.current) {
            refImg.current.slideToIndex(index)
            refImg.current.fullScreen()
        }
    }

    return (
        <form className="p-3 mx-auto" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            {errors && <ValidationErrors errors={errors}/>}

            <TabContent activeTab={activeTab}>
                <TabPane tabId={0}>
                    <VehicleInfosPartialForm {...{
                        vehicleType,
                        formData,
                        control,
                        errors
                    }} />
                </TabPane>
                
                <TabPane tabId={1}>
                    <div className="form-fields">
                        <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                            {t('vehicles:equipments-selection')}
                        </Typography>
                        <CheckboxGroup
                            name="equipments"
                            options={formData.CheckboxOptionsEquipments}
                            defaultOptions={['ABS', 'ESP']}
                            control={control}
                            errors={errors}
                        />
                    </div>
                </TabPane>

                <TabPane tabId={2}>
                    <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                        {t('vehicles:damages-potential-selection')}
                    </Typography>
                    <DamageSelectorControlled
                        name="damages"
                        vehicleType={vehicleType}
                        control={control}
                        defaultValues={announce.getDamagesTabs}
                        selectorFullWidth
                    />
                </TabPane>

                <TabPane tabId={3}>
                    <div className="pics">
                        {announce.getCountImages > 0 && (
                            <>
                                <GalleryViewer
                                    images={announce.getImages}
                                    ref={refImg}
                                />
                                {isDesktop && (
                                    <GalleryImgsLazy
                                        images={announce.getImages}
                                        handleCLickImg={handleCLickImg}
                                    />
                                )}
                            </>
                        )}
                    </div>
                    <AnnounceImagesAutoUpload
                        announceSlug={announce.getSlug}
                        enableRefreshAfterUpload
                    />
                </TabPane>

                <TabPane tabId={4}>
                    <PublicationInfosPartialForm {...{
                        watch,
                        control,
                        errors,
                        register,
                        handleRemove
                    }} />
                </TabPane>
            </TabContent>
        </form>
    )
}

const VehicleInfosPartialForm = ({ vehicleType, formData, control, errors }) => {
    const { t } = useTranslation()
    
    return (
        <div className="form-fields">
            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                {t('vehicles:manufacturer-data')}
            </Typography>

            <Row>
                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:make')}>
                        <TextInput
                            name={'manufacturer.make.make'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:model')}>
                        <TextInput
                            name={'manufacturer.model.model'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:generation')}>
                        <TextInput
                            name={'manufacturer.model.trim'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <FieldWrapper label={t('vehicles:year')}>
                        <TextInput
                            name={'manufacturer.model.year'}
                            control={control}
                            disabled
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:cylinder')}>
                        <NumberInput name="vehicleEngineCylinder"
                            control={control}
                            errors={errors}
                            placeholder="150 ch"

                        />
                    </FieldWrapper>
                </Col>

            </Row>

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:gas')}>
                        <SelectInput name="vehicleEngineGas"
                            options={formData.RadioChoicesGas}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:gear-box')}>
                        <SelectInput
                            name="vehicleEngineType"
                            options={formData.RadioChoicesEngine}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:power')}>
                        <NumberInput
                            name="powerKw"
                            control={control}
                            errors={errors}
                            placeholder={0}


                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:power_ch')}>
                        <NumberInput
                            name="powerCh"
                            control={control}
                            errors={errors}
                            placeholder={0}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                Utilisation
            </Typography>
            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:type')}>
                        <SelectInput
                            name="vehicleFunctionType"
                            options={formData.RadioTypeFunction}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:vehicle_function')}>
                        <SelectInput
                            name="vehicleFunction"
                            options={formData.RadioFunctionVehicle}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:mileage')}>
                        <NumberInput
                            name="mileage"
                            placeholder="20000 km"
                            control={control}
                            errors={errors}

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:vehicle-state')}>
                        <SelectInput
                            name="vehicleGeneralState"
                            options={formData.RadioVehicleGeneralState}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:owners_quantity')}>
                        <SelectInput
                            name="ownersCount"
                            options={SelectOptionsUtils([2,3,4,5,6,7,8,9])}
                            placeholder="Select number of owners"
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                {t('vehicles:consumption')}
            </Typography>
            <Row>
                <Col>
                    <FieldWrapper label="Mixte (g/km)">
                        <NumberInput
                            name="consumptionMixt"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="Ville (g/km)">
                        <NumberInput
                            name="consumptionCity"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label="Route (g/km)">
                        <NumberInput
                            name="consumptionRoad"
                            control={control}
                            errors={errors}
                            placeholder="20 g/100"

                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label="CO2 (g/km)">
                        <NumberInput
                            name="consumptionGkm"
                            control={control}
                            errors={errors}
                            placeholder={0}

                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:class_emission')}>
                        <SelectInput
                            name="emission"
                            options={formData.RadioChoicesEmission}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                {t('vehicles:additional-data')}
            </Typography>
            
            {vehicleType !== vehicleTypes.moto && (
                <Row>
                    <Col>
                        <FieldWrapper label={t('vehicles:doors_quantity')}>
                            <SelectInput
                                name="doors"
                                options={SelectOptionsUtils([2,3,4,5,6,7,8,9])}
                                placeholder="Select number of doors"
                                control={control}
                                errors={errors}
                            />
                        </FieldWrapper>
                    </Col>
                    <Col>
                        <FieldWrapper label={t('vehicles:seats_quantity')}>
                            <SelectInput
                                name="seats"
                                options={SelectOptionsUtils([2,3,4,5,6,7,8,9])}
                                placeholder={t('vehicles:select_seats_quantity')}
                                control={control}
                                errors={errors}
                            />
                        </FieldWrapper>
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <FieldWrapper label={t('vehicles:paint')}>
                        <SelectInput
                            name="paint"
                            options={formData.RadioChoicesPaints}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
                <Col>
                    <FieldWrapper label={t('vehicles:materials')}>
                        <SelectInput
                            name="materials"
                            isMulti
                            options={formData.RadioChoicesMaterials}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>

            <Row>
                {vehicleType !== vehicleTypes.moto && (
                    <Col>
                        <FieldWrapper label={t('vehicles:internal_color')}>
                            <SelectInput
                                name="externalColor"
                                options={formData.RadioChoicesExternalColor}
                                control={control}
                                errors={errors}
                            />
                        </FieldWrapper>
                    </Col>
                )}
                
                <Col>
                    <FieldWrapper label={t('vehicles:external_color')}>
                        <SelectInput
                            name="internalColor"
                            options={formData.RadioChoicesExternalColor}
                            control={control}
                            errors={errors}
                        />
                    </FieldWrapper>
                </Col>
            </Row>
        </div>
    )
}

const PublicationInfosPartialForm = ({ watch, control, errors, handleRemove }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [openDialogRemove, setOpenDialogRemove] = React.useState(false)

    const handleOpenDialogRemove = () => {
        setOpenDialogRemove(true)
    }

    const handleCloseDialogRemove = () => {
        setOpenDialogRemove(false)
    }

    const countrySelect = watch('countrySelect')

    return (
        <div className="form-fields">
            <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                Données de publication
            </Typography>

            {/*<FieldWrapper label="Titre de l'annonce">*/}
            {/*    <TextInput*/}
            {/*        name="title"*/}
            {/*        control={control}*/}
            {/*        disabled*/}
            {/*    />*/}
            {/*</FieldWrapper>*/}

            <FieldWrapper label={t('vehicles:ad-price')}>
                <NumberInput
                    name="price"
                    placeholder="15000€"
                    errors={errors}
                    control={control}
                    rules={{
                        required: t('form_validations:required'),
                        validate: val => {
                            const value = Number(val)
                            if (value < 500) return t('form_validations:min_price_{min}{currency}', { min : 500, currency : '€'})
                            if (value > 200000) return t('form_validations:max_price_{max}{currency}', { max : 200000, currency : '€'})
                        }
                    }}
                />
            </FieldWrapper>
    
            <FieldWrapper label={t('vehicles:description')}>
                <TextareaInput
                    name="description"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
    
            <FieldWrapper label="Tags">
                <TagsControlled
                    name="tags"
                    control={control}
                    errors={errors}
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
                    errors={errors}
                    rules={{ required: t('form_validations:required') }}>
                </SearchLocationInput>
            </FieldWrapper>

            <div style={{ border : '1px solid', padding : '1rem'}}>
                <Typography component="h3" variant="h3" className="text-center" gutterBottom>
                    {t('vehicles:announce-management')}
                </Typography>
    
                <FieldWrapper >
                    <CheckboxMUI
                        name="showCellPhone"
                        label={t('vehicles:show-cell-phone')}
                        control={control}
                        errors={errors}
                    />
                </FieldWrapper>
                
                <CheckboxMUI
                    name="status"
                    value="active"
                    label={t('vehicles:archive-announce')}
                    color="secondary"
                    control={control}
                    errors={errors}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonRemove}
                    startIcon={<DeleteIcon/>}
                    onClick={handleOpenDialogRemove}>
                    {t('vehicles:remove-announce')}
                </Button>
            </div>

            <Dialog
                open={openDialogRemove}
                onClose={handleCloseDialogRemove}
            >
                <DialogTitle id="alert-dialog-title" disableTypography>
                    {t('vehicles:confirm-suppression')}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialogRemove} color="primary" autoFocus>
                        {t('vehicles:cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        className={classes.button}
                        startIcon={<DeleteIcon/>}
                        onClick={() => handleRemove}>
                        {t('vehicles:remove-announce')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Buttons = ({ triggerSubmit, announcePageLink }) => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className="d-flex flex-column mx-auto my-3" style={{ maxWidth : '300px'}}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon/>}
                type="submit"
                onClick={() => {
                    triggerSubmit()
                }}>
                {t('vehicles:save-announce')}
            </Button>

            <CTALink title={t('vehicles:see-announce')} href={announcePageLink}/>
        </div>
    )
}

const NavDesktop = ({ activeTab, toggleTab, triggerSubmit, slug }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const tabs = [
        {
            title: t('vehicles:vehicle-informations')
        },
        {
            title: t('vehicles:equipments')
        },
        {
            title: t('vehicles:vehicle-state')
        },
        {
            title: t('vehicles:pictures')
        },
        {
            title: t('vehicles:publication')
        }
    ]
    return (
        <div className={clsx(classes.nav, classes.stickyNav)}>
            <div className="my-2">
                <Nav vertical className={classes.navList}>
                    {tabs && tabs.map((tab, index) => (
                        <NavItem
                            key={index}
                            className={clsx(classes.navItem, activeTab === index && 'active')}
                            onClick={() => toggleTab(index)}>
                            {tab.title}
                        </NavItem>
                    ))}
                </Nav>
            </div>

            <Buttons
                announcePageLink={`/announces/${slug}`}
                triggerSubmit={triggerSubmit}
            />
        </div>
    )
}

const NavMobile = ({ activeTab, toggleTab }) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const tabs = [
        {
            title: t('vehicles:vehicle-informations')
        },
        {
            title: t('vehicles:equipments')
        },
        {
            title: t('vehicles:vehicle-state')
        },
        {
            title: t('vehicles:pictures')
        },
        {
            title: t('vehicles:publication')
        }
    ]
    return (
        <Nav className={clsx(classes.navList, classes.navMobile)}>
            {tabs && tabs.map((tab, index) => (
                <NavItem
                    key={index}
                    className={clsx(classes.navItem, activeTab === index && 'active')}
                    onClick={() => toggleTab(index)}>
                    {tab.title}
                </NavItem>
            ))}
        </Nav>
    )
}

export default AnnounceEdit
