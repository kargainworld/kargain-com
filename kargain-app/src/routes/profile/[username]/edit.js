import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next-translate/Link';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import useTranslation from 'next-translate/useTranslation';
import { Col, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import TextInput from '../../../components/Form/Inputs/TextInput'
import EmailInput from '../../../components/Form/Inputs/EmailInput'
import SelectCountryFlags from '../../../components/Form/Inputs/SelectCountryFlags'
import SearchLocationInput from '../../../components/Form/Inputs/SearchLocationInput'
import ValidationErrors from '../../../components/Form/Validations/ValidationErrors';
import AvatarPreviewUpload from '../../../components/Avatar/AvatarPreviewUpload';
import OffersPurchaseForm from '../../../components/Stripe/OffersPurchaseForm';
import FieldWrapper from '../../../components/Form/FieldWrapper';
import CTALink from '../../../components/CTALink';
import { MessageContext } from '../../../context/MessageContext';
import { useAuth } from '../../../context/AuthProvider';
import UsersService from '../../../services/UsersService';
import { themeColors } from '../../../theme/palette';
import UserModel from '../../../models/user.model';
import Error from '../../_error';

const useStyles = makeStyles(() => ({
    stickyNav: {
        position: 'fixed'
    },

    nav: {
        padding: 0,
        width: '100%',
        maxWidth: '260px'
    },

    navMobile: {
        display: 'flex'
    },

    navList: {
        width: '100%',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
        borderRadius: '20px'
    },

    button: {
        margin: '1rem'
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
    }
}));

const Edit = () => {
    const formRef = useRef();
    const theme = useTheme();
    const router = useRouter();
    const { username } = router.query
    const { isAuthReady } = useAuth();
    const { offer } = router.query;
    const { t } = useTranslation();
    const classes = useStyles();
    const { dispatchModal, dispatchModalError } = useContext(MessageContext);
    const [activeTab, setActiveTab] = useState(0);
    const [state, setState] = useState({
        err : null,
        stateReady : false,
        isSelf : false,
        isAdmin : false,
        profile : new UserModel()
    });
    const [openDialogRemove, setOpenDialogRemove] = useState(false);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    });

    const tabs = [
        {
            title: t('vehicles:my-profile')
        },
        {
            title: t('vehicles:subscriptions')
        },
        {
            title: t('vehicles:payments-bills')
        },
        {
            title: t('vehicles:notifications')
        },
        {
            title: t('vehicles:confidentiality-security')
        }
    ];

    const toggleTab = (tabIndex) => {
        if (activeTab !== tabIndex) {
            setActiveTab(tabIndex);
        }
    };

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const handleOpenDialogRemove = () => {
        setOpenDialogRemove(true);
    };

    const handleCloseDialogRemove = () => {
        setOpenDialogRemove(false);
    };

    const handleRemove = () => {
        UsersService.removeUser(state.profile.getUsername)
            .then(() => {
                dispatchModal({ msg: 'User successfully removed (disabled)' });
            }).catch(err => {
                dispatchModalError({ err });
            }
            );
    };

    const fetchProfile = useCallback(async () => {
        try{
            const result = await UsersService.getUserByUsername(username);
            const { user, isAdmin, isSelf } = result
            setState(state => ({
                ...state,
                stateReady : true,
                profile : new UserModel(user),
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
    },[username])

    useEffect(()=>{
        if (offer) setActiveTab(2);
        if(isAuthReady) fetchProfile()
    },[isAuthReady, fetchProfile])

    if (!state.stateReady) return null;
    if (state.err) return <Error statusCode={state.err?.statusCode}/>;

    return (
        <>
            <Dialog
                open={openDialogRemove}
                onClose={handleCloseDialogRemove}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
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

            {state.isAdmin && (
                <Alert severity="info" className="mb-2">
                    Connected as Admin
                </Alert>
            )}

            {!isDesktop && (
                <NavMobile {...{
                    tabs,
                    activeTab,
                    toggleTab
                }}/>
            )}

            <Row className="justify-content-center">
                {isDesktop && (
                    <Col sm="12" md="3" lg="3">
                        <NavDesktop {...{
                            tabs,
                            classes,
                            activeTab,
                            toggleTab,
                            triggerSubmit,
                            profilePageLink: state.profile.getProfileLink
                        }}/>
                    </Col>
                )}

                <Col xs="12" md="9" lg="9">
                    <MultiTabsForm
                        {...{
                            formRef,
                            activeTab,
                            offer,
                            triggerSubmit,
                            handleOpenDialogRemove,
                            profilePageLink : state.profile.getProfileLink,
                            defaultValues : {
                                ...state.profile.getRaw,
                                address :  state.profile.getAddressParts
                            }
                        }}/>
                </Col>
            </Row>
        </>
    );
};

const MultiTabsForm = ({offer, activeTab, formRef, defaultValues, triggerSubmit, handleOpenDialogRemove, profilePageLink}) => {
    const theme = useTheme();
    const classes = useStyles();
    const { t } = useTranslation();
    const { dispatchModal, dispatchModalError } = useContext(MessageContext);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    });
    const { control, watch, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
        defaultValues
    });

    const onSubmit = (form) => {
        UsersService.updateUser(form)
            .then(() => {
                dispatchModal({
                    msg: 'User successfully updated'
                });
            }).catch(err => {
                dispatchModalError({ err });
            }
            );
    };

    return(
        <form className="p-3 mx-auto" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            {errors && <ValidationErrors errors={errors}/>}
            <TabContent activeTab={activeTab}>
                <TabPane tabId={0}>
                    <ProfilePartialForm {...{
                        control,
                        watch,
                        errors
                    }}/>
                </TabPane>
                <TabPane tabId={1}>
                    <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                        {t('vehicles:subscriptions')}
                    </Typography>
                </TabPane>
                <TabPane tabId={2}>
                    <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                        {t('vehicles:payments-bills')}
                    </Typography>
                    <OffersPurchaseForm offer={offer}/>
                </TabPane>
                <TabPane tabId={3}>
                    <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                        {t('vehicles:notifications')}
                    </Typography>
                </TabPane>
                <TabPane tabId={4}>
                    <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                        {t('vehicles:confidentiality-security')}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon/>}
                        onClick={handleOpenDialogRemove}>
                        {t('vehicles:remove-profile')}
                    </Button>
                </TabPane>
            </TabContent>

            {!isDesktop && (
                <Buttons {...{
                    profilePageLink,
                    triggerSubmit
                }}/>
            )}
        </form>
    )
}

const ProfilePartialForm = ({ control, watch, errors }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const countrySelect = watch('countrySelect');
    return (
        <>
            <Typography component="h2" variant="h2" className="text-center" gutterBottom>
                {t('vehicles:edit-my-profile')}
            </Typography>
            <AvatarPreviewUpload/>
            <div className={classes.formRow}>
                <FieldWrapper label={t('vehicles:firstname')}>
                    <TextInput
                        name="firstname"
                        errors={errors}
                        control={control}
                        rules={{ required: t('form_validations:required') }}
                    />
                </FieldWrapper>

                <FieldWrapper label={t('vehicles:lastname')}>
                    <TextInput
                        name="lastname"
                        errors={errors}
                        control={control}
                        rules={{ required: t('form_validations:required') }}
                    />
                </FieldWrapper>
            </div>

            <FieldWrapper label="Email">
                <EmailInput
                    name="email"
                    errors={errors}
                    control={control}
                    disabled
                    rules={{ required: t('form_validations:required') }}
                />
            </FieldWrapper>

            <FieldWrapper label={t('vehicles:password')} classNameWrapper="my-3">
                <Link href="/auth/forgotten">
                    <a className="m-2">
                        Reset password
                    </a>
                </Link>
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

            <FieldWrapper label={t('vehicles:phone')}>
                <TelInput
                    name="phone"
                    errors={errors}
                    control={control}
                    rules={{ required: t('form_validations:field-is-required') }}
                    innerProps={{
                        country: 'fr'
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Description">
                <TextareaInput
                    name="about"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>
        </>
    );
};

const NavDesktop = ({ tabs, activeTab, toggleTab, triggerSubmit, profilePageLink }) => {
    const classes = useStyles();
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
                triggerSubmit={triggerSubmit}
                profilePageLink={profilePageLink}
            />
        </div>
    );
};

const NavMobile = ({ tabs, activeTab, toggleTab }) => {
    const classes = useStyles();

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
    );
};

const Buttons = ({ triggerSubmit, profilePageLink }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-column mx-auto my-3" style={{ maxWidth: '300px' }}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon/>}
                type="submit"
                onClick={() => {
                    triggerSubmit();
                }}>
                {t('vehicles:save')}
            </Button>

            <CTALink title={t('vehicles:back_to_profile')} href={profilePageLink}/>
        </div>
    );
};

export default Edit;
