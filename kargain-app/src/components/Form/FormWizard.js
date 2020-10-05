import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { ProgressBar } from 'react-step-progress-bar'
import useTranslation from 'next-translate/useTranslation'
import ControlledStep from './ControlledStep'
import BreadcrumbSteps from './BreadcrumbSteps'
import useIsMounted from '../../hooks/useIsMounted'
import DebugLocalStorage from '../DebugLocalStorage'
import { FormContext } from '../../context/FormContext'
import Header from '../Header'

const calculatePourcent = (current, length) => {
    return ((current + 1) / (length + 1)) * 100
}

const FormWizard = ({ debug, formKey, onFinalSubmit, children }) => {
    const isMounted = useIsMounted()
    const { t } = useTranslation()
    const steps = Array.isArray(children) ? children.filter(child => child.props.hidden !== true) : children ? [children] : []
    const { formDataContext, dispatchFormUpdate } = useContext(FormContext)
    const [activeStep, setActiveStep] = useState(formDataContext.currentStep || 0)
    const [maxActiveStep, setMaxActiveStep] = useState(steps.length)
    const [pourcent, setPourcent] = useState(() => calculatePourcent(activeStep, steps.length))
    const [endForm, setEndForm] = useState(false)

    const setStep = useCallback((index) => {
        setActiveStep(index)
    }, [])

    const prevStep = useCallback(() => {
        setActiveStep(activeStep => activeStep - 1)
    }, [])

    const nextStep = useCallback(() => {
        setActiveStep(activeStep => activeStep + 1)
    }, [])

    const triggerDispatchFormData = (data) => {
        dispatchFormUpdate(data)
    }

    const onSubmitStep = useCallback((data) => {
        triggerDispatchFormData(data)
        nextStep()
    }, [])

    const handleSubmitForm = (data) => {
        triggerDispatchFormData(data)
        setEndForm(true)
    }
    
    useEffect(() => {
        dispatchFormUpdate({
            vehicleType : formKey.toLowerCase()
        })
    },[])
    
    useEffect(() => {
        window.scrollTo(0, 0)
        if (isMounted) {
            setMaxActiveStep(maxStep => Math.max(maxStep, Number(activeStep)))
            dispatchFormUpdate({ currentStep: activeStep })
            setPourcent(calculatePourcent(activeStep, steps.length))
        }
    }, [activeStep])
    
    useEffect(() => {
        if (isMounted && endForm) {
            console.log('end form reached')
            onFinalSubmit(formDataContext)
            setEndForm(false)
        }
    }, [endForm])
    
    return (
        <div className="formWizardContainer">
            <BreadcrumbSteps activeStepIndex={activeStep}
                steps={steps}
                setStep={setStep}
                maxActiveStep={maxActiveStep}
            />
            <ProgressBar percent={pourcent} filledBackground="linear-gradient(to right, #5480e4, #2C6BFC)"/>
            <Header as="h4" center={false} text={[t('layout:form'), t(`vehicles:${formKey.toLowerCase()}`)].join(' ')}/>

            <ControlledStep
                step={steps[activeStep]}
                onSubmitStep={onSubmitStep}
                prevStep={prevStep}
                nextStep={nextStep}
                handleSubmitForm={handleSubmitForm}
            />

            {debug && (
                <Row>
                    <Col>
                        <div>
                            <h2> formContext </h2>
                            <pre>{JSON.stringify(formDataContext, null, 2)}</pre>
                        </div>
                    </Col>
                    <Col>
                        <DebugLocalStorage value="formData"/>
                    </Col>
                </Row>
            )}

        </div>
    )
}

FormWizard.propTypes = {
    formKey: PropTypes.string.isRequired,
    debug: PropTypes.bool,
    enableResume: PropTypes.bool
}

FormWizard.defaultProps = {
    formKey: '',
    debug: false,
    enableResume: false
}

export default FormWizard
