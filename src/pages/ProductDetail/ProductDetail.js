/**
 * Created by Mark Webley on 09/09/2020.
 */
import React from 'react';
import './product-detail.styles.scss';
import Header from "../../components/header/Header";

const ProductDetail = () => {

    return (
        <>
            <Header></Header>
            <h1>ProductDetail</h1>
            <div className="product-container">
                <div className="panel product-image">Image Area</div>
                <div className="panel product-description">button and description area</div>
            </div>
            <div className="product-info">additional info area</div>
        </>
    );
};

export default ProductDetail;
