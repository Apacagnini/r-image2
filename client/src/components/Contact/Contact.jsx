import React from 'react';

export default function Contact({active, callback, className}) {
    return (
        <div className={`justify-content-end ${className}`}>
            <button 
                type="button" 
                onClick={callback}
                className={`nav-link active text-center text-hover-color customButton ${active ? 'button-active' : 'text-secondary'}`} 
            >CONTACT</button>
        </div>
    );
}