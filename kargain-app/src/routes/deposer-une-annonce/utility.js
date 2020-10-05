import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import FormWizard from '../../components/Form/FormWizard'
import AnnounceService from '../../services/AnnounceService'
import { MessageContext } from '../../context/MessageContext'
import Step0_Manufacturer from '../../components/Products/Step0_Manufacturer'
import Step1CamperDetails from '../../components/Products/utility/Step1_UtiilityDetails'
import Step2UtilityStatus from '../../components/Products/utility/Step2_UtiliyStatus'
import Step3_PublishAnnounce from '../../components/Products/Step3_Publish'
import {vehicleTypes} from '../../business/vehicleTypes'

const UtilityForm = (props) => {
    const router = useRouter()
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const { t } = useTranslation()

    const onFinalSubmit = async data => {
        try {
            const announce = await AnnounceService.createAnnounce(data, props.token)
            const link = `/announces/${announce?.slug}`

            dispatchModal({
                msg: t('vehicles:announce_created_successfully'),
                persist: true,
                link
            })

            router.push(link)
        }
        catch(err){
            dispatchModalError({ err })
        }
    }

    return (
        <FormWizard
            formKey={props.formKey}
            prevRoute="/deposer-une-annonce"
            onFinalSubmit={onFinalSubmit}
        >
            <Step0_Manufacturer
                vehicleType={vehicleTypes.utility}
                title={t('vehicles:vehicle-selection')}
            />
            <Step1CamperDetails title={t('vehicles:vehicle-description')}/>
            <Step2UtilityStatus title={t('vehicles:vehicle-state')}/>
            <Step3_PublishAnnounce title={t('vehicles:your-announce')}/>
        </FormWizard>
    )
}

UtilityForm.getInitialProps = () => {
    return {
        formKey: 'utility',
        requiredAuth: true
    }
}

export default UtilityForm
