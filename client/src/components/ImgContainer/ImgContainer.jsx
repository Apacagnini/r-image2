import React from 'react';
import { Container } from 'react-bootstrap';
import ImgBox from '../ImgBox/ImgBox';

export default function ImgContainer({ usedIds, getSrc, getPhotographer, getAlt }) {
    return (
        <Container fluid className='d-flex flex-wrap justify-content-center'>
            {usedIds.map((id, index) => {
                return (
                    <ImgBox
                        key={index.toString()}
                        title={getPhotographer(id)}
                        alt={getAlt(id) || 'random image'}
                        src={getSrc(id, 'medium')}
                        srcFullScreen={getSrc(id, 'large2x')}
                        hrefDownload={getSrc(id, 'original')}
                    />
                )
            })}
        </Container>
    );
}