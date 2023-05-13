import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ReactComponent as MagnifyingGlass } from '../../assets/magnifying-glass.svg'

export default function SearchBar({ activeCategory, categoriesList, setFilteredCategories, categoriesCallback, className }) {
    const { register, watch, handleSubmit, reset, getValues } = useForm("");
    const [focus, setFocus] = useState(false);
    const maxLength = 16;
    const limit = 10;

    const randomCategories = (n) => {
        let randomList = [];
        let list = [...categoriesList]

        for (let i = 0; i < n; i++) {
            let index = Math.floor(Math.random() * (list.length - 1));
            randomList.push(list.splice(index, 1).pop());
        }
        return randomList;
    }

    const filter = (searchField) => {
        if (!(searchField)) return [];

        searchField = searchField.toLowerCase();
        const startsWith = [];
        const includes = [];

        categoriesList.forEach(category => {
            if (category.startsWith(searchField)) {
                startsWith.push(category);
            } else if (category.includes(searchField)) {
                includes.push(category);
            }
        });

        return startsWith.concat(includes).slice(0, limit);
    }

    const onSubmit = ({ searchField }) => {
        const li = filter(searchField);

        if (li.length != 0) {
            categoriesCallback(li.shift(), 6);
            setFilteredCategories([]);
        }
        reset();
    }

    watch(({ searchField }) => {
        setFilteredCategories(filter(searchField));
    });

    useEffect(() => reset(), [activeCategory]);

    useEffect(() => {
        if (focus && getValues("searchField") === '') {
            setFilteredCategories(randomCategories(limit));
        }
    }, [focus]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`search-bar-form ${className}`}>
            <input
                type="text"
                placeholder={activeCategory}
                maxLength={maxLength}
                autoComplete="off"
                id="searchField"
                {...register('searchField', { required: true, maxLength: maxLength })}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <label>
                <input type="submit" className='d-none' />
                <MagnifyingGlass />
            </label>
        </form>
    );
}