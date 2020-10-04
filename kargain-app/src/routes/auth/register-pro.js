import React, { useContext } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@material-ui/core/Typography';
import AuthService from '../../services/AuthService';
import { MessageContext } from '../../context/MessageContext';
import TextInput from '../../components/Form/Inputs/TextInput'
import EmailInput from '../../components/Form/Inputs/EmailInput'
import CheckBoxInput from '../../components/Form/Inputs/CheckBoxInput'
import PasswordInput from '../../components/Form/Inputs/PasswordInput'
import SelectCountryFlags from '../../components/Form/Inputs/SelectCountryFlags'
import SearchLocationInput from '../../components/Form/Inputs/SearchLocationInput'
import FieldWrapper from '../../components/Form/FieldWrapper';
import SSOProviders from '../../components/SSOProviders';

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all'
};

const RegisterPro = () => {
    const { control, errors, getValues, watch, handleSubmit} = useForm(formConfig);
    const { dispatchModal, dispatchModalError } = useContext(MessageContext);
    const { t } = useTranslation();

    const onSubmit = (form) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { confirm, confirmPwd, ...data } = form;
        AuthService.registerPro(data)
            .then(() => {
                dispatchModal({
                    persist: true,
                    msg: t('layout:account_created')
                });
            }).catch(err => {
                dispatchModalError({ err });
            });
    };

    const countrySelect = watch('countrySelect');

    return (
        <Container>
            <h1>{t('vehicles:register-pro')}</h1>
            <Row>
                <Col className="m-auto" sm="12" md="10">
                    <SSOProviders/>
                    <form className="p-3 mx-auto"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            borderRadius: '5px',
                            maxWidth: '500px'
                        }}>

                        <Typography component="h3" variant="h3">Votre société</Typography>
                        <FieldWrapper label={t('layout:company')}>
                            <TextInput
                                name="company.name"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required') }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('layout:siren')}>
                            <TextInput
                                name="company.siren"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required') }}
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

                        <Typography component="h3" variant="h3">{t('vehicles:about-you')}</Typography>

                        <FieldWrapper label={t('vehicles:lastname')}>
                            <TextInput
                                name="lastname"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required') }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:firstname')}>
                            <TextInput
                                name="firstname"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required') }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:email_address')}>
                            <EmailInput
                                name="email"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required') }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:password')}>
                            <PasswordInput
                                name="password"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: t('form_validations:required'),
                                    pattern: {
                                        value: /^(?=.*\d).{4,16}$/,
                                        message: t('form_validations:regexPwd{min}{max}', {
                                            min: 4,
                                            max: 16
                                        })
                                    }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:password_confirm')}>
                            <PasswordInput
                                name="confirmPwd"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: t('form_validations:required'),
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || t('form_validations:form_validations')
                                        }
                                    }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper>
                            <CheckBoxInput
                                label={t('vehicles:accept-cgu')}
                                name="confirm"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required') }}
                            />
                        </FieldWrapper>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPro;
