import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Col, Container, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import { MessageContext } from '../../context/MessageContext'
import AuthService from '../../services/AuthService'
import TextInput from '../../components/Form/Inputs/TextInput'
import EmailInput from '../../components/Form/Inputs/EmailInput'
import CheckBoxInput from '../../components/Form/Inputs/CheckBoxInput'
import PasswordInput from '../../components/Form/Inputs/PasswordInput'
import FieldWrapper from '../../components/Form/FieldWrapper'
import CTAButton from '../../components/CTAButton'
import SSOProviders from '../../components/SSOProviders'
import CTALink from '../../components/CTALink'

const formConfig = {
    mode: 'onChange',
    validateCriteriaMode: 'all'
}

const RegisterPage = () => {
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const { control, errors, getValues, handleSubmit } = useForm(formConfig)
    const { t } = useTranslation()
    const router = useRouter()

    const onSubmit = (form) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { confirm, confirmPwd, ...data } = form
        AuthService.register(data)
            .then(() => {
                router.push('/auth/login')

                dispatchModal({
                    persist: true,
                    msg: t('layout:account_created')
                })
            }).catch(err => {
                dispatchModalError({ err })
            }
            )
    }

    return (
        <Container>
            <h1>{t('vehicles:register')}</h1>
            <Row>
                <Col className="m-auto" sm="12" md="10">
                    <SSOProviders/>

                    <div className="mx-auto text-center">
                        <CTALink
                            title={t('vehicles:register-pro')}
                            href="/auth/register-pro"
                        />
                    </div>

                    <form className="p-3 mx-auto"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            borderRadius: '5px',
                            maxWidth: '500px'
                        }}>
                        <FieldWrapper label={t('vehicles:firstname')}>
                            <TextInput
                                name="firstname"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required')}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:lastname')}>
                            <TextInput
                                name="lastname"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required')}}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Email" required>
                            <EmailInput
                                name="email"
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required')}}
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
                                        value : /^(?=.*\d).{4,16}$/,
                                        message : t('form_validations:regexPwd{min}{max}',{
                                            min : 4, max : 16
                                        })
                                    }}
                                }
                            />
                        </FieldWrapper>

                        <FieldWrapper label={t('vehicles:password_confirm')}>
                            <PasswordInput
                                name="confirmPwd"
                                errors={errors}
                                control={control}
                                rules={{
                                    required: t('form_validations:required'),
                                    pattern: {
                                        value : /^(?=.*\d).{4,16}$/,
                                        message : t('form_validations:regexPwd{min}{max}',{
                                            min : 4, max : 16
                                        })
                                    },
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues()
                                            return password === value || t('form_validations:form_validations')
                                        }
                                    }
                                }}
                            />
                        </FieldWrapper>

                        <FieldWrapper>
                            <CheckBoxInput
                                name="confirm"
                                label={t('vehicles:accept-cgu')}
                                errors={errors}
                                control={control}
                                rules={{ required: t('form_validations:required') }}
                            />
                        </FieldWrapper>

                        <div className="submit">
                            <CTAButton
                                title={t('vehicles:register')}
                                submit
                            />
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage
