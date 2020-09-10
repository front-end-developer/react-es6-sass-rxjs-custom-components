/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useState, useEffect } from 'react';
import './carousel.styles.scss';

const Carousel = ({clickHandler, items, screenTitle, env}) => {
    const [currentItem, setCurrentItem] = useState({item: 0});

    useEffect(() => {
        setDefaults();
    },[]);

    // todoa a Page Size Event



    function setDefaults() {
        if (items.length) {
        }
    }

    const moveItemLeft = () => {
        if (currentItem.item <= 0) {
            return;
        }
        setCurrentItem({item: --currentItem.item});
        items.map(element => {
            let carouselItem = document.querySelector(`#item-${element.id}`);
            let elementWidth = parseInt(window.getComputedStyle(carouselItem).width);
            let elementLeft = parseInt(window.getComputedStyle(carouselItem).left);
            carouselItem.style.left =  `${elementLeft + parseInt(elementWidth)}px`;
        });

    }

    const moveItemRight = (event) => {
        if (currentItem.item >= items.length -1) {
            return;
        }
        setCurrentItem({item: ++currentItem.item});
        items.map(element => {
            let carouselItem = document.querySelector(`#item-${element.id}`);
            let elementWidth = parseInt(window.getComputedStyle(carouselItem).width);
            let elementLeft = parseInt(window.getComputedStyle(carouselItem).left);
            carouselItem.style.left =  `${elementLeft - parseInt(elementWidth)}px`;

            console.log(carouselItem.style.left);
        });
    };

    let createElements = items.map((element) => {
       return (
           <span
                className="carousel-item"
                id={`item-${element.id}`}
                key={element.id}
                onClick={clickHandler}>

                <img src={element.image} alt="" />
                <span className="description">{element.description}</span>
            </span>
       )
    });

    return (
        <>
            <div className="carousel">
                <div className="btn-left" onClick={moveItemLeft}> &lt; </div>
                {
                    createElements
                }
                <div className="btn-right" onClick={moveItemRight}> &gt; </div>
            </div>
        </>
    );
};

export default Carousel;


