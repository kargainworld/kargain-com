import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({ fullscreen }) => (
    <>
        <style jsx>{`
            .loader_overlay{
                position : fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0,0,0,0.2)
            }
            
             .circle {
                 & .path {
                     stroke: hsl(210, 70, 75);
                 }
            }
        `}</style>
        
        <div className="loader_overlay">
            <span className={fullscreen ? 'circle_loader_fullscreen' : 'circle_loader'}>
                <svg className="circle" width="60" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" cx="30" cy="30" r="15"/>
                </svg>
            </span>
        </div>
    </>
)

Loading.propTypes = {
    fullscreen: PropTypes.bool
}

Loading.defaultProps = {
    fullscreen: true
}

export default Loading
