import React, {useState, useRef, useEffect} from "react";
import { useIntl } from "react-intl";
import './Body.scss'

const Body = (props) => {
    const intl = useIntl()

    return (
        <div className={"body" + (props.size ? ' ' + props.size:'') + (props.uppercase ? ' uppercase':'')}>{intl.formatMessage({id:props.children})}</div>
    )
}

export default Body