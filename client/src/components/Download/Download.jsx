import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ReactComponent as DownloadIcon } from '../../assets/circle-down.svg'
import { ReactComponent as Spin } from '../../assets/spin.svg'

export default function Download(props) {
    const [loading, setLoading] = useState(false);

    const findExtension = (str) => {
        let extension = '';
        str = str.toLowerCase();

        ['.jpg', '.jpeg', '.png', '.bmp', '.raw', '.tiff', '.gif'].every(e => {
            if (str.includes(e)) {
                extension = e;
                return false;
            }
            return true;
        });

        return extension;
    }

    const onButtonClick = async (event) => {
        event.stopPropagation();
        setLoading(true);
        const response = await fetch(props.href);
        const blob = await response.blob();
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = props.title + findExtension(props.href);
        a.click();
        setLoading(false);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {loading ? 'Downloading' : 'Download full image'}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            {
                loading ? <Spin /> :
                    <button type="button" className='customButton' onClick={onButtonClick}><DownloadIcon /></button>
            }
        </OverlayTrigger>
    );
}