import React from 'react';
import { ReactComponent as Spin } from '../../assets/spin.svg'

export default function Footer({ loading }) {
    return (
        <footer>
            {loading ? <Spin /> : <></>}
        </footer>
    );
}