/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useState, useEffect, useRef } from 'react';
import './carousel.styles.scss';

const Carousel = ({clickHandler, items}) => {
    const [currentItem, setCurrentItem] = useState({item: 0});
    const componentContext = useRef(null);
    const moveItemLeft = (event) => {
        if (currentItem.item <= -1) {
            return;
        }
        const domItem = event.target.parentElement;
        setCurrentItem({item: --currentItem.item});
        items.map(element => {
            const margins = 52;
            let carouselItem = domItem.querySelector(`#item-${element.id}`);
            let elementWidth = parseInt(window.getComputedStyle(carouselItem).width);
            let elementLeft = parseInt(window.getComputedStyle(carouselItem).left);
            carouselItem.style.left =  `${margins + elementLeft + parseInt(elementWidth)}px`;
        });
    }

    function moveItemRight(event) {
        if (currentItem.item >= items.length -3) {
            return;
        }
        const domItem = event.target.parentElement;
        setCurrentItem({item: ++currentItem.item});
        items.map(element => {
            const margins = 52;
            let carouselItem = domItem.querySelector(`#item-${element.id}`);
            let elementWidth = parseInt(window.getComputedStyle(carouselItem).width);
            let elementLeft = parseInt(window.getComputedStyle(carouselItem).left);
            carouselItem.style.left =  `${(elementLeft - margins) - parseInt(elementWidth)}px`;
        });
    };

    const clickProduct = (event) => {
        const productId = event.currentTarget.id.substr(5);
        clickHandler(productId);
    }

    let createElements = items.map((element) => {
       return (
           <span
                className="carousel-item"
                id={`item-${element.id}`}
                key={element.id}
                onClick={clickProduct}>
                <img src={element.image} alt="" />
                <span className="description">{element.description}</span>
            </span>
       )
    });

    return (
        <>
            <div className="mw-carousel" ref={componentContext}>
                <div className="btn-left" onClick={moveItemLeft}> &lt; </div>
                <div className="carousel-content">{ createElements }</div>
                <div className="btn-right" onClick={moveItemRight}> &gt; </div>
            </div>
        </>
    );
};

export default Carousel;


