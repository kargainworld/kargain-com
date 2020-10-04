import React from 'react'
import Link from 'next-translate/Link'
import { useAuth } from '../../context/AuthProvider'

const CheckEmail = () => {
    const { authenticatedUser } = useAuth()
    const email = authenticatedUser ? authenticatedUser.getEmail : null
    const text = email ? <span className="font-weight-bold">{authenticatedUser.getEmail}</span> : <span>your inbox</span>

    return (
        <main>
            <div className="text-center pt-5 pb-5">
                <h1 className="display-4">Check your email</h1>
                <p className="lead">We’ve sent a message to {text} with a link to activate your account.</p>
                <p>If you don’t see an email from us within a few minutes, a few things could have happened: </p>
                <ul>
                    <li> The email is in your spam folder. (Sometimes things get lost in there.)</li>
                    <li> TThe email address you entered had a mistake or typo. (Happens to the best of us.)</li>
                    <li> You accidentally gave us another email address. (Usually a work or personal one instead of the
                        one you meant.)
                    </li>
                    <li>We can’t deliver the email to this address. (Usually because of corporate firewalls or
                        filtering.)
                    </li>
                </ul>

                <p>
                    <Link href={`/auth/signup/resend-activation?username=${email}&redirect="/profile"`}>
                        <a> Re-enter your email and try again </a>
                    </Link>
                </p>

                <p>I have already clicked the button, <Link href="/profile">take me to my account</Link></p>
            </div>
        </main>
    )
}

export default CheckEmail
