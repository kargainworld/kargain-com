import React from 'react'
import { Row } from 'reactstrap'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import clsx from 'clsx'
import useTranslation from 'next-translate/useTranslation'

const useStyles = makeStyles(() => ({
    button: {
        padding: '1rem',
        margin: '10px',
        marginTop: '40px',
        border: '1px solid'
    }
}))

const StepNavigation = ({ prev, prevLabel, next, nextLabel, submit, submitLabel, ...defaultProps }) => {
    const {defaultPrevLabel, defaultNextLabel, defaultSubmitLabel } = defaultProps
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <Row className="form_navigation justify-content-around">

            {prev && (
                <button className={clsx('btn', classes.button)} type="button" onClick={() => prev()}>
                    {prevLabel || t(`vehicles:${defaultPrevLabel}`)}
                </button>
            )}

            {next && !submit && (
                <button className={clsx('btn', classes.button)} type="button" onClick={e => next(e)}>
                    {nextLabel || t(`vehicles:${defaultNextLabel}`)}
                </button>
            )}

            {!next && submit && (
                <button className={clsx(classes.button, 'btn btn-primary')} type="submit">
                    {submitLabel || t(`vehicles:${defaultSubmitLabel}`)}
                </button>
            )}

        </Row>
    )
}

StepNavigation.propTypes = {
    prev: PropTypes.func,
    next: PropTypes.func
}

StepNavigation.defaultProps = {
    defaultPrevLabel: 'previous',
    defaultNextLabel: 'following',
    defaultSubmitLabel: 'following'
}

export default StepNavigation
