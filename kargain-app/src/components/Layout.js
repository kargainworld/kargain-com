import React from 'react'
import FooterLight from './FooterLight'
import ScrollUpButton from 'react-scroll-up-button'
import NavbarClient from './NavbarClient'

const Layout = ({ children }) => {
    return (
        <>
            <NavbarClient/>
            <MainBody>
                {children}
            </MainBody>
            <FooterLight/>
            <ScrollUpButton
                ShowAtPosition={150}
                EasingType='easeOutCubic'
                AnimationDuration={500}
                ContainerClassName="scroll_to_top"
                style={{
                    height: '30px',
                    width: '30px',
                    border: '3px solid gainsboro'
                }}>
            </ScrollUpButton>
        </>
    )
}

const MainBody = ({ children }) => (
    <main className="main">
        {children}
    </main>
)

export default Layout
