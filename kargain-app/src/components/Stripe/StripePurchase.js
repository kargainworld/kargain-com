import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useAuth } from '../../context/AuthProvider'
import paymentsServices from '../../services/PaymentsService'
import { MessageContext } from '../../context/MessageContext'
import config from '../../config/config'

const stripePromise = loadStripe(config.stripe.API_KEY)

const useStyles = makeStyles(() => ({
    Wrapper: {
        margin: '1rem 0',
        padding: '1rem',
        border: '1px solid gainsboro'
    },

    Form: {
        animation: 'fade 200ms ease-out'
    },

    FormGroup: {
        margin: '0 15px 20px',
        padding: 0,
        borderStyle: 'none',
        backgroundColor: '#7795f8',
        willChange: 'opacity, transform',
        boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08)',
        borderRadius: '4px'
    },

    FormRow: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
        borderTop: '1px solid #819efc'
    },

    FormRowLabel: {
        width: '110px',
        minWidth: '70px',
        padding: '11px 0',
        color: '#c4f0ff',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },

    FormRowInput: {
        fontSize: '16px',
        width: '100%',
        padding: '11px 15px 11px 0',
        border: 'none',
        color: '#fff',
        backgroundColor: 'transparent',
        animation: '1ms void-animation-out',

        '&::placeholder': {
            color: '#87bbfd'
        }
    },

    StripeElement: {
        width: '100%',
        padding: '11px 15px 11px 0'
    },

    SubmitButton: {
        display: 'block',
        fontSize: '16px',
        width: 'calc(100% - 30px)',
        height: '40px',
        margin: '40px 15px 0',
        backgroundColor: '#f6a4eb',
        boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08) inset 0 1px 0 #ffb9f6',
        borderRadius: '4px',
        color: '#fff',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 100ms ease-in-out',
        willChange: 'transform, background-color, box-shadow',

        '&:disabled': {
            opacity: '0.5',
            cursor: 'default',
            backgroundColor: '#7795f8',
            boxShadow: 'non'
        },

        '&:active': {
            backgroundColor: '#d782d9',
            boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08) inset 0 1px 0 #e298d8',
            transform: 'scale(0.99)'
        }
    },

    ErrorMessage: {
        color: '#fff',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 15px',
        fontSize: '13px',
        marginTop: '0px',
        width: '100%',
        transform: 'translateY(-15px)',
        opacity: 0,
        // animation: fade 150;ms ease-out;
        animationDelay: '50ms',
        animationFillMode: 'forwards',
        willChange: 'opacity, transform'
    },

    Result: {
        marginTop: '50px',
        textAlign: 'center',
        animation: 'fade 200ms ease-out'
    },

    ResultTitle: {
        color: '#fff',
        fontWeight: 500,
        marginBottom: '8px',
        fontSize: '17px',
        textAlign: 'center'
    },

    ResultMessage: {
        color: '#9cdbff',
        fontSize: '14px',
        fontWeight: 400,
        marginBottom: '25px',
        lineHeight: '1.6em',
        textAlign: 'center'
    },

    ResetButton: {
        border: 0,
        cursor: 'pointer',
        background: 'transparent'
    }
}))

const ResetButton = ({ onClick }) => {
    const classes = useStyles()
    return (
        <button type="button" className={classes.ResetButton} onClick={onClick}>
            <svg width="32px" height="32px" viewBox="0 0 32 32">
                <path
                    fill="#FFF"
                    d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
                />
            </svg>
        </button>
    )
}

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Source Code Pro, monospace',
            '::placeholder': {
                color: '#FF797E81'
            },
            fontWeight: 500,
            fontSize: '16px',
            padding: 10,
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883'
            }
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: '#9e2146'
        }
    }
}

const StripeCard = ({ offer }) => {
    const classes = useStyles()
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [cardComplete, setCardComplete] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth()

    const createPaymentIntent = async () => {
        try {
            console.log('create payment intent')
            // Create PaymentIntent as soon as the page loads
            const data = await paymentsServices.createPaymentIntent({
                product: offer.title
            })
            setClientSecret(data.clientSecret)
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        createPaymentIntent()
    }, [])

    const handleCardChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }

    const handleSubmit = async () => {
        if (!isAuthenticated) return setForceLoginModal(true)
        if (cardComplete) setProcessing(true)
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: authenticatedUser.getEmail,
                        name: authenticatedUser.getFullName
                    }
                }
            })

            if (payload.error) {
                elements.getElement('card').focus()
                setError(`Payment failed ${payload.error.message}`)
                setProcessing(false)
            }

            else {
                setError(null)
                setProcessing(false)
                setSucceeded(true)

                const result = await paymentsServices.createUserSubscription({
                    payload,
                    offerTitle : offer.title
                })

                if (payload.paymentIntent.status === 'succeeded') {
                    dispatchModal({
                        msg: 'succeeded',
                        persist: true
                    })
                }
            }
        } catch (err) {
            setError(err)
        }
    }

    const reset = () => {
        setError(null)
        setProcessing(false)
        setPaymentMethod(null)
    }

    return (
        <div className={classes.Wrapper}>
            {paymentMethod ? (
                <div className={classes.Result}>
                    <div className={classes.ResultTitle} role="alert">
                        Payment successful
                    </div>
                    <div className="ResultMessage">
                        Thanks for trying Stripe Elements. No money was charged, but we
                        generated a PaymentMethod: {paymentMethod.id}
                    </div>
                    <ResetButton onClick={reset}/>
                </div>
            ) : (
                <>
                    <CardElement
                        options={CARD_OPTIONS}
                        onChange={handleCardChange}
                        onReady={() => {console.log('CardElement [ready]')}}
                        onBlur={() => {console.log('CardElement [blur]')}}
                        onFocus={() => {console.log('CardElement [focus]')}}
                    />

                    <button
                        className={clsx(classes.SubmitButton, error && 'SubmitButton--error')}
                        disabled={processing || disabled || succeeded}
                        onClick={() => handleSubmit()}>
                        <span id="button-text">
                            {processing ? (
                                <div className="spinnerCard"/>
                            ) : (
                                `Pay ${offer.nicePrice}`
                            )}
                        </span>
                    </button>

                    {/* Show any error that happens when processing the payment */}
                    {error && (
                        <div className="card-error" role="alert">
                            {error}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css?family=Roboto'
        }
    ]
}

const StripePurchase = (props) => {
    return (
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <StripeCard {...props}/>
        </Elements>
    )
}

export default StripePurchase
