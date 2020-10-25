import { css } from 'emotion'
import classNames from 'classnames'

export const bannerDimension = classNames(css`
    width: 100%;
    height: 30%;
    margin-bottom: 100px;
    margin: 0 auto;
`)

export const svgBackgroundImage = (img) =>
    classNames(css`
        background-image: url(${img});
        background-size: cover;
        position: relative;
        background-position: 45% 57%;
    `)
