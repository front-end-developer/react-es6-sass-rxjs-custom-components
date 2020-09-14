/**
 * Created by Mark Webley on 11/09/2020.
 */
import React, { useRef, useEffect, useState } from 'react';
import './favourites.styles.scss';

const Favourites = (props) => {
    // {favouriteHandler, inWishList}
    const [favourited, setFavourited] = useState(false);
    const buttonRef = useRef();

    const setBorder = () => {
        if (props?.customBorder !== '') {
            buttonRef.current.style.borderColor = props.customBorder;
        }
    }

    const isInWishList = () => {
        if (typeof props.inWishList === 'undefined') {
            return;
        }

        const wishedFor = props.inWishList;
        if (typeof wishedFor !== 'boolean' || typeof wishedFor === 'string') {
            console.warn('incorrect type set for AddToWishList Component, instead of boolean value');
        } else {
            (wishedFor) ? buttonRef.current.classList.add('selected') : buttonRef.current.classList.remove('selected');
            setFavourited(wishedFor);
        }
    }

    useEffect(() => {
        isInWishList();
        setBorder();
    }, [props.inWishList, props.customBorder]);

    const addToWishList = (event) => {
        event.currentTarget.classList.toggle('selected');
        const wishedFor = !favourited;

        setFavourited(wishedFor);
        props.favouriteHandler(wishedFor);
    }

    return (
        <button ref={buttonRef} onClick={addToWishList} className="add-to-wishlist">
        </button>
    )
}

export default Favourites;
