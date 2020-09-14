import {of} from 'rxjs';
import {ajax as http} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';
import {Config} from './config/config-api';
import { useHistory } from 'react-router-dom';
import WishListStore from "./store/wish-list.store";

const errorHandler = (error) => {
 if (error.response?.message) {
   throw new Error(error.response.message);
 }
 return of(error);
}

const transformData = (item) => {
    const data = {
        id: item?.id || 0,
        image: `${Config.IMAGE_URL}${item?.poster_path}` || '',
        title: item?.title || '',
        description: item?.overview || '',
        voteCount: item?.vote_count || 0
    };
    return data;
}

const getGenreItemsA = () => {
    return http.getJSON(`${Config.URL}${Config.API.VERSION}/list/1?${Config.API.KEY}&${Config.LANGUAGE}`)
        .pipe(
            map(res => {
                const productList = [];
                res.items.forEach((item) => {
                    productList.push(transformData(item));
                })
                return productList;
            }),
            catchError(error => errorHandler(error))
        );
}

const getGenreItemsB = () => {
    return http.getJSON(`${Config.URL}${Config.API.VERSION}/list/2?${Config.API.KEY}&${Config.LANGUAGE}`)
        .pipe(
            map(res => {
                const productList = [];
                res.items.forEach((item) => {
                    productList.push(transformData(item));
                })
                return productList;
            }),
            catchError(error => errorHandler(error))
        );
}

const getGenreItemsC = () => {
    return http.getJSON(`${Config.URL}${Config.API.VERSION}/list/35?${Config.API.KEY}&${Config.LANGUAGE}`)
        .pipe(
            map(res => {
                const productList = [];
                res.items.forEach((item) => {
                    productList.push(transformData(item));
                })
                return productList;
            }),
            catchError(error => errorHandler(error))
        );
}

const getMovieDetails = (movieId) => {
    return http.getJSON(`${Config.URL}${Config.API.VERSION}/movie/${movieId}?${Config.API.KEY}&${Config.LANGUAGE}`)
        .pipe(
            map(res => {
                return res;
            }),
            catchError(error => errorHandler(error))
        );
}

/**
 * @description     could use db for this, but instead used /store/wish-list.store.js
 * @param           movieDetails
 */
const toggleAddToWishList = (movieDetails) => {
    WishListStore.toggle(movieDetails.id, movieDetails);
}

export {
    getGenreItemsA,
    getGenreItemsB,
    getGenreItemsC,
    getMovieDetails,
    toggleAddToWishList
};
