/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useEffect, useState,  } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './product-detail.styles.scss';
import Header from "../../components/header/Header";
import * as dataService from "../../services/DataService";
import {take} from "rxjs/operators/index";
import Favourites from "../../components/common/favourites/Favourites";
import {Config} from "../../services/config/config-api";
import WishListStore from "../../services/store/wish-list.store";
import CurrencyFormat from 'react-currency-format';

const ProductDetail = ({ match }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [genres, setGenres] = useState([]);
    const [styleGenres, setStyleGenres] = useState([]);
    const errorDefaultMessage = 'There was an unexpected error during the process';
    const movieId = match.params.id;
    const historyUrl = useHistory();
    let observableMovieInformation$;

    useEffect(() => {
        if (movieId) {
            getMovieDetails(movieId);
        } else {
            historyUrl.push('/');
        }

        return () => {
            observableMovieInformation$.unsubscribe();
        }
    }, []);

    function getMovieDetails(movieId) {
        observableMovieInformation$ = dataService.getMovieDetails(movieId)
            .pipe(take(1))
            .subscribe(movieInformation => {
                setMovieDetails(movieInformation);
                setGenres(movieInformation.genres.map(genre => genre.name).join(' | '));
                setStyleGenres(movieInformation.genres.map(genre => genre.name.replace(' ', '-').toLowerCase()).join(' '));
                setIsLoading(false);
            }, (err) => {
                const errorMsg = err?.message || errorDefaultMessage;
                console.warn('Error:', errorMsg);
                setIsLoading(false);
            });
    }

    const favouriteHandler = (isWishedFor) => {
        dataService.toggleAddToWishList(movieDetails);
    }

    const setCustomBorder = () => {
        if (styleGenres.indexOf('adventure') > -1) {
            return '#FFA500';
         } else if (styleGenres.indexOf('tv-movie') > -1) {
             return '#006CAE';
        } else {
             // default
             return '';
         }
    }

    const isInWishList = () => {
        if (typeof movieDetails.id === 'undefined') {
            return false;
        } else {
            return (typeof WishListStore.get(movieDetails.id).movieDetail === "undefined") ? false : true;
        }
    }

    return (

        <>
             <Header history={historyUrl}></Header>

            { (typeof movieDetails.id !== "undefined") &&
                (<div>
                   <div className="product-container">
                       <div className="panel product-image">
                            <img src={`${Config.IMAGE_BACK_DROP_URL_LARGE}${movieDetails['backdrop_path']}`} alt={movieDetails.title} />
                       </div>
                        <div className={`panel product-description ${styleGenres}`}>
                           <h1>
                               <span>
                                   <Favourites
                                       favouriteHandler={favouriteHandler}
                                       customBorder={setCustomBorder()}
                                       inWishList={isInWishList()}
                                   ></Favourites>
                               </span>
                               {movieDetails?.title}
                           </h1>
                           <h2>{movieDetails?.tagline} <span className="btn-votes">Votes: {movieDetails['vote_count']}</span></h2>
                            <div className="summary">
                                <p>{movieDetails?.overview}</p>
                            </div>
                        </div>
                   </div>


                   <div className="product-info">
                       <div>
                            <img src={`${Config.IMAGE_URL}${movieDetails['poster_path']}`} alt={movieDetails.title} />
                       </div>
                       <div className="product-data">
                           <a href={movieDetails?.homepage} className="btn-view-site" content="_blank">
                            View Site
                           </a>
                           <p>Release Date: {movieDetails['release_date']}</p>
                           <p>Length: {movieDetails?.runtime}</p>
                           <p>Languages: { movieDetails['spoken_languages'].map(lang => lang.name).join(' | ')}</p>
                           <p>Original Language: {movieDetails['original_language']}</p>
                           <p>Genres: { genres }</p>
                           <p>Production Companies: { movieDetails['production_companies'].map(productionCompanies => productionCompanies.name).join(' | ') }</p>
                           <p>Revenue: <CurrencyFormat value={movieDetails?.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                           <p>Budget: <CurrencyFormat value={movieDetails?.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                       </div>
                   </div>
               </div>)}
        </>
    );
};

export default ProductDetail;
