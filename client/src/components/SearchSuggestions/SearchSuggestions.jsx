import React from 'react';

export default function SearchSuggestions({ filteredCategories, activeCategory, categoriesCallback, className}) {

    return (
        <ul className={`navbarNav ${ filteredCategories.length === 0 ? 'd-none' : className}`}>
            {filteredCategories.map((category, index) => {
                let buttonClassName = `btn-nav bg-transparent text-hover-color ${(activeCategory == category) ? 'button-active' : 'text-secondary'}`
                return (
                    <li className='text-center' key={index}>
                        <button type='button' className={buttonClassName} onClick={() => categoriesCallback(category, 6)} id={category}>
                            {`${category.charAt(0).toUpperCase() + category.slice(1)}`}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}