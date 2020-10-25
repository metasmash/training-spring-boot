import React from 'react'
import * as css from './Banner.css'
import asset from '../Assets/asset.jpg'

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
                    d="M0,256L34.3,256C68.6,256,137,256,206,250.7C274.3,245,343,235,411,213.3C480,192,549,160,617,154.7C685.7,149,754,171,823,186.7C891.4,203,960,213,1029,218.7C1097.1,224,1166,224,1234,192C1302.9,160,1371,96,1406,64L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                />
            </svg>
        </div>
    )
}
