import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Download from '../Download/Download';
import { ReactComponent as Arrows } from '../../assets/arrows-up-down-left-right.svg'
import { ReactComponent as Xmark } from '../../assets/xmark.svg'

export default function ImgBox({ title, alt, src, srcFullScreen, hrefDownload }) {
    const [show, setShow] = useState(false);

    return (
        <div className='box'>
            <img className='img-fluid' alt={alt} src={src} />
            <button type="button" onClick={() => setShow(!show)}>
                <p>{title}</p>
                <Arrows />
                <Modal show={show} fullscreen={true} onHide={() => setShow(false)} className='ImgFullScreen'>
                    <Modal.Body>
                        <img className='img-fluid' alt={alt} src={srcFullScreen} />
                        <div></div>
                    </Modal.Body>
                    <Modal.Header><Xmark/></Modal.Header>
                    <Modal.Footer>
                        <Modal.Title>{title}</Modal.Title>
                        <Download title={title} href={hrefDownload} />
                    </Modal.Footer>
                </Modal>
            </button>
        </div>
    )
}