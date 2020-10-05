import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
    root: {
        border: '1px solid #dce0e0',
        borderRadius: '.1875rem',
        backgroundColor: '#fff', //f7f8f9
        padding: '1rem'
    }
}))

const Step = ({ step, ...stepProps }) => {
    const classes = useStyles()
    const { nextStep } = stepProps

    const triggerSkipStep = () => {
        nextStep()
    }

    return (
        <section className={classes.root}>
            {step ? React.cloneElement(step, {
                triggerSkipStep, ...stepProps
            }) : 'step not found'}
        </section>
    )
}

export default Step
