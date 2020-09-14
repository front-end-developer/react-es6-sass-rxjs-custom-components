/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { take } from 'rxjs/operators';
import Header from '../../components/header/Header';
import Carousel from '../../components/common/carousel/Carousel';
import CarouselBanners from '../../components/common/carousel-banners/CarouselBanners';
import bannerItems from '../../services/mocks/banner-items.mock';
import * as dataService from '../../services/DataService';
import './product-list.styles.scss';

const ProductList = () => {
    const [actionItems, setActionItems] = useState([]);
    const [adventureItems, setAdventureItems] = useState([]);
    const [comedyItems, setComedyItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const items = bannerItems;
    const errorDefaultMessage = 'There was an unexpected error during the process';
    let observableActionItems$, observableAdventureItems$, observableComedyItems$;

    useEffect(() => {
        getGenreItemsA();
        getGenreItemsB();
        getGenreItemsC();
        return () => {
            observableActionItems$.unsubscribe();
            observableAdventureItems$.unsubscribe();
            observableComedyItems$.unsubscribe();
        }
    }, []);

    function getGenreItemsA() {
        observableActionItems$ = dataService.getGenreItemsA()
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

    function getGenreItemsB() {
        observableAdventureItems$ = dataService.getGenreItemsB()
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

    function getGenreItemsC() {
        observableComedyItems$ =  dataService.getGenreItemsC()
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

    const showDetail = (productId) => {
        history.push(`/product/${productId}`);
    };

    return (
        <>
            <Header></Header>
            <CarouselBanners items={items} clickHandler={showDetail}></CarouselBanners>
            <CarouselBanners items={items} clickHandler={showDetail}></CarouselBanners>
            {actionItems ? <Carousel items={actionItems} clickHandler={showDetail}></Carousel> : null}
            {adventureItems ? <Carousel items={adventureItems} clickHandler={showDetail}></Carousel> : null}
            {comedyItems ? <Carousel items={comedyItems} clickHandler={showDetail}></Carousel> : null}
        </>
    );
}

export default ProductList;
