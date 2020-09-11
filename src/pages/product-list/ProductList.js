/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useEffect, useState } from 'react';
import { observable } from 'rxjs';
import { take } from 'rxjs/operators';
import Header from '../../components/header/Header';
import Carousel from '../../components/common/carousel/Carousel';
import CarouselBanners from '../../components/common/carousel-banners/CarouselBanners';
import * as dataService from '../../services/DataService';
import './product-list.styles.scss';

const ProductList = () => {
    const [actionItems, setActionItems] = useState([]);
    const [adventureItems, setAdventureItems] = useState([]);
    const [comedyItems, setComedyItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const errorDefaultMessage = 'There was an unexpected error during the process';
    let observableActionItems$;

    useEffect(() => {
        getAllActionItems();
        // getAllAdventureItems();
        // getAllComedyItems();
        return () => {
            observableActionItems$.unsubscribe();
        }
    }, []);

    function getAllActionItems() {
        observableActionItems$ = dataService.getAllActionItems()
            .pipe(take(1))
            .subscribe(items => {
            setActionItems(items);
            setIsLoading(false);
        }, (err) => {
            const errorMsg = err?.message || errorDefaultMessage;
            console.warn('Error:', errorMsg);
            setIsLoading(false);
        });
    }

    function getAllAdventureItems() {
        dataService.getAllAdventureItems()
            .pipe(take(1))
            .subscribe(items => {
            setAdventureItems(items);
            setIsLoading(false);
        }, (err) => {
            const errorMsg = err?.message || errorDefaultMessage;
            console.warn('Error:', errorMsg);
            setIsLoading(false);
        });
    }

    function getAllComedyItems() {
        dataService.getAllComedyItems()
            .pipe(take(1))
            .subscribe(items => {
            setComedyItems(items);
            setIsLoading(false);
        }, (err) => {
            const errorMsg = err?.message || errorDefaultMessage;
            console.warn('Error:', errorMsg);
            setIsLoading(false);
        });
    }

    const showDetail = (event) => {
        console.log('show detail');
    };

    const items = [
        {
            id: '0',
            image: 'http://image.tmdb.org/t/p/w185//c8M0ylYFRpQJaxGwPwm3DKK2ltC.jpg',
            description: 'description 1',
        }, {
            id: '1',
            image: 'http://image.tmdb.org/t/p/w185//6GnBsOIi1t4aGuLh3NF9TfU8u37.jpg',
            description: 'description 2',
        }, {
            id: '2',
            image: 'http://image.tmdb.org/t/p/w185//KoYWXbnYuS3b0GyQPkbuexlVK9.jpg',
            description: 'description 3',
        }, {
            id: '3',
            image: 'http://image.tmdb.org/t/p/w185//lv3RonWge4GlC9ymNzC0oWpFCfv.jpg',
            description: 'description 1',
        }, {
            id: '4',
            image: 'http://image.tmdb.org/t/p/w185//8rN7hvGDmje6CDAYuIuVB4UhT0c.jpg',
            description: 'description 2',
        }, {
            id: '5',
            image: 'http://image.tmdb.org/t/p/w185//63LTbyqZundWf9LVyg1XXMqw3eQ.jpg',
            description: 'description 3',
        }, {
            id: '6',
            image: 'http://image.tmdb.org/t/p/w185//c8M0ylYFRpQJaxGwPwm3DKK2ltC.jpg',
            description: 'description 1',
        }, {
            id: '7',
            image: 'http://image.tmdb.org/t/p/w185//6GnBsOIi1t4aGuLh3NF9TfU8u37.jpg',
            description: 'description 2',
        }, {
            id: '8',
            image: 'http://image.tmdb.org/t/p/w185//c8M0ylYFRpQJaxGwPwm3DKK2ltC.jpg',
            description: 'description 3',
        }
    ];

    return (
        <>
            <Header></Header>
            <CarouselBanners items={items} clickHandler={showDetail}></CarouselBanners>
            <CarouselBanners items={items} clickHandler={showDetail}></CarouselBanners>
            {items ? <Carousel items={items} clickHandler={showDetail}></Carousel> : null}
            {items ? <Carousel items={items} clickHandler={showDetail}></Carousel> : null}
            {items ? <Carousel items={items} clickHandler={showDetail}></Carousel> : null}
        </>
    );
}

export default ProductList;
