import {of} from 'rxjs';
import {ajax as http} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';
import {Config} from './config/config-api';

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

const getAllActionItems = () => {
    console.log(`${Config.URL}${Config.API.VERSION}/list/23?${Config.API.KEY}&${Config.LANGUAGE}`);
    return http.getJSON(`${Config.URL}${Config.API.VERSION}/list/23?${Config.API.KEY}&${Config.LANGUAGE}`)
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

const getAllAdventureItems = () => {
    return http.getJSON(`${Config.URL}${Config.API.VERSION}/list/12?${Config.API.KEY}&${Config.LANGUAGE}`)
        .pipe(
            map(res => res),
            catchError(error => errorHandler(error))
        );
}

const getAllComedyItems = () => {
    return http.getJSON(`${Config.URL}${Config.API.VERSION}/list/35?${Config.API.KEY}&${Config.LANGUAGE}`)
        .pipe(
            map(res => res),
            catchError(error => errorHandler(error))
        );
}

export {
    getAllActionItems,
    getAllAdventureItems,
    getAllComedyItems
};
