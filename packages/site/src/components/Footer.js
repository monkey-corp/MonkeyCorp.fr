import React from "react";
import { useIntl } from "react-intl";
import './Footer.scss'
import Body from './Body'

const Footer = (props) => {
    const intl = useIntl()

    return (
        <div className="footer">
            <div className="footer-contact"><Body>{'footer-contact'}</Body></div>
            <div className="footer-text"><Body size={'small'}>{'footer-rights'}</Body></div>
        </div>
    )
}

export default Footer