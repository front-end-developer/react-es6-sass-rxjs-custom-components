/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/header/Header';
import Carousel from '../../components/common/carousel/Carousel';
import { getAllItems } from '../../services/DataService';

const Home = () => {
    const [dataItems, setDataItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllDataItems();
    },[]);

    function getAllDataItems () {
        getAllItems().subscribe(items => {
            setDataItems(items);
            setIsLoading(false);
        }, (err) => {
            const errorMsg = err?.message || 'There was an unexpected error during the process';
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
            image: '/images/8.jpg',
            description: 'description 1',
        }, {
            id: '1',
            image: '/images/photo-1556955112-28cde3817b0a.jpg',
            description: 'description 2',
        }, {
            id: '2',
            image: '/images/photo-1560448204-e02f11c3d0e2.jpg',
            description: 'description 3',
        }
    ];

    return (
        <>
            <Header></Header>
            <Carousel items={items} clickHandler={showDetail}></Carousel>
            <Carousel items={items} clickHandler={showDetail}></Carousel>
            <Carousel items={items} clickHandler={showDetail}></Carousel>
        </>
    );
}

export default Home;
