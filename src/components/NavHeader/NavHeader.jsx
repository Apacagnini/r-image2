import React, { useEffect, useState } from 'react';
import Contact from '../Contact/Contact';
import ContactForm from '../ContactForm/ContactForm';
import SearchBar from '../SearchBar/SearchBar';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import { ReactComponent as Bars } from '../../assets/bars.svg'
import { ReactComponent as Xmark } from '../../assets/xmark.svg'

export default function NavHeader(props) {
    const [borderNavbar, setBorderNavbar] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [state, setState] = useState('');
    // state : '' | 'contact' | 'active'

    const checkBorderNavbar = () => {
        if (window.scrollY > 0) {
            setBorderNavbar(true);
        } else {
            setBorderNavbar(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkBorderNavbar, true);
        return () => {
            window.removeEventListener('scroll', checkBorderNavbar);
        }
    }, []);


    const MainToggle = () => {
        if (state === '') {
            setState('active');
        } else {
            setState('');
        }
    }

    const setFormCollapse = () => {
        if (state === 'contact') {
            setState('active');
        } else {
            setState('contact');
        }
    }

    return (
        <nav className={`blur border-bottom-transition navHeader ${borderNavbar ? 'border-bottom-active' : ''} ${state === 'contact' ? 'fullHeight' : ''}`}>
            <div className='flexDirection justify-content-between align-content-center'>
                <div className='order-0 d-flex justify-content-between align-content-center'>
                    <a className="navbar-brand text-secondary text-hover-color logo" href="#">R-IMAGE</a>
                    <button type="button" className='nav-link active text-center text-hover-color navButton d-lg-none' onClick={MainToggle} >
                        {state === '' ? <Bars className='navIcon' /> : <Xmark className='navIcon' />}
                    </button>
                </div>
                <Contact
                    active={state === 'contact'}
                    callback={setFormCollapse}
                    className={`order-1 order-lg-2 ${(state === '') ? 'navCollapse' : 'navShow'}`}
                />
                {
                    (state === 'contact') ? <></> :
                        (props.apiError === true) ? <p className="order-2 order-lg-1 navError">Usage limit reached</p> :
                            <SearchBar
                                activeCategory={props.activeCategory}
                                categoriesList={props.categoriesList}
                                categoriesCallback={props.categoriesCallback}
                                setFilteredCategories={setFilteredCategories}
                                className={`order-2 order-lg-1 ${(state === '') ? 'navCollapse' : 'navShow'}`}
                            />
                }
            </div>
            {
                (state === 'contact') ? <ContactForm /> :
                    (props.apiError === true) ? <></> :
                        <SearchSuggestions
                            activeCategory={props.activeCategory}
                            categoriesList={props.categoriesList}
                            categoriesCallback={props.categoriesCallback}
                            filteredCategories={filteredCategories}
                            className={(state === '') ? 'navCollapse' : 'navShow'}
                        />
            }
        </nav>
    );
}