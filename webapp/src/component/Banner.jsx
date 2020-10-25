import React from 'react'
import * as css from './Banner.css'
import asset from '../Assets/whv.jpg'

export const Banner = () => {
    return (
        <div className={css.bannerDimension}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1100 320"
                className={css.svgBackgroundImage(asset)}
            >
                <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,288L120,288C240,288,480,288,720,245.3C960,203,1200,117,1320,74.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                />
            </svg>
        </div>
    )
}
