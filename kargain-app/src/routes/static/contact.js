import React, { useContext } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useForm } from 'react-hook-form'
import UsersService from '../../services/UsersService'
import CTAButton from '../../components/CTAButton'
import EmailInput from '../../components/Form/Inputs/EmailInput'
import FieldWrapper from '../../components/Form/FieldWrapper'
import SelectInput from '../../components/Form/Inputs/SelectInput'
import TextareaInput from '../../components/Form/Inputs/TextareaInput'
import { MessageContext } from '../../context/MessageContext'

const ContactPage = () => {
    const { t } = useTranslation()
    const { control, errors, handleSubmit } = useForm()
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)

    const onSubmit = (form) => {
        const { email, message, subject } = form
        UsersService.contact({
            email,
            message,
            subject: subject?.value
        })
            .then(() => {
                dispatchModal({ msg: 'Your message have successfully been sent' })
            }).catch(err => {
                dispatchModalError({ err })
            })
    }

    return (
        <div className="container mt-4">
            <style jsx>
                {`
                      form{
                          border-radius : 5px;
                          border : 1px solid gainsboro;
                          max-width : 500px
                      }
                `}
            </style>
            <h1>{t('vehicles:contact-form')} </h1>
            <form className="p-3 mt-3 mx-auto"
                onSubmit={handleSubmit(onSubmit)}>

                <FieldWrapper label={t('vehicles:email_address')}>
                    <EmailInput
                        name="email"
                        inline
                        errors={errors}
                        control={control}
                        rules={{ required: t('form_validations:required') }}
                    />
                </FieldWrapper>

                <FieldWrapper label={t('vehicles:subject')}>
                    <SelectInput
                        name="subject"
                        options={[
                            {
                                label: t('vehicles:informations_request'),
                                value: 'informations'
                            },
                            {
                                label: t('vehicles:partnership_request'),
                                value: 'partnership'
                            },
                            {
                                label: 'Bug',
                                value: 'bug'
                            }
                        ]}
                        selected={['informations']}
                        rules={{ required: t('form_validations:required') }}
                        control={control}
                        errors={errors}
                    />
                </FieldWrapper>

                <FieldWrapper label={t('vehicles:message')}>
                    <TextareaInput
                        className="form-control editor"
                        name="message"
                        rows={5}
                        cols={13}
                        control={control}
                        errors={errors}
                    />
                </FieldWrapper>

                <div className="submit">
                    <CTAButton
                        title={t('vehicles:send')}
                        submit
                    />
                </div>
            </form>
        </div>
    )
}

export default ContactPage
