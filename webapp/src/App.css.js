import { css } from 'emotion'
import classNames from 'classnames'

export const flex = classNames(css`
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`)

export const centered = classNames(css`
    text-align: center;
    width: 100%;
    height: 100%;
    margin-top: 40px;
    margin-bottom: 40px;
`)

export const flexButtons = classNames(css`
    text-align: center;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 30;
`)

export const centeredBis = classNames(css`
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
`)
