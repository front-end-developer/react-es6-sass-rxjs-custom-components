/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useState, useEffect, useRef } from 'react';
import './carousel.styles.scss';

const Carousel = ({clickHandler, items}) => {
    const [currentItem, setCurrentItem] = useState({item: 1});
    const componentRef = useRef();

    const setMiddleIndex = () => {
        const domItem = componentRef.current;
        const carouselWidth= parseInt(window.getComputedStyle(domItem).width);
        if (items.length) {
            const carouselItemWidth = parseInt(window.getComputedStyle(domItem.querySelector('.carousel-item')).width);
            const itemsPerSet = Math.floor(carouselWidth / carouselItemWidth) ;
            setCurrentItem({
                item: Math.floor((items.length - itemsPerSet) / 2) + 1
            });
        }
    }

    useEffect(() => {
        setMiddleIndex();
    }, [items]);

    /**
     * @description     could have used componentRef ref here, but this is a core javascript example
     */
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

    /**
     * @description     could have used componentRef ref here, but this is a core javascript example
     */
    function moveItemRight(event) {
        const domItem = event.target.parentElement;
        const carouselWidth= parseInt(window.getComputedStyle(domItem).width);
        const carouselItemWidth = parseInt(window.getComputedStyle(event.target.parentElement.querySelector('.carousel-item')).width);
        const itemsPerSet = Math.floor(carouselWidth / carouselItemWidth);
        const lastRowSet = Math.ceil((items.length+1) / itemsPerSet);
        // TODO:  (items.length - itemsPerSet) // items.length not working as expected because flexbox causings carousel items to be placed in the middle


        if (currentItem.item >=  items.length -3) {
            return;
        }
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
            <div className="mw-carousel" ref={componentRef}>
                <div className="btn-left" onClick={moveItemLeft}> &lt; </div>
                <div className="carousel-content">{ createElements }</div>
                <div className="btn-right" onClick={moveItemRight}> &gt; </div>
            </div>
        </>
    );
};

export default Carousel;


