/**
 * Created by Mark Webley on 11/09/2020.
 */
import {Credentials} from "./credentials-api-key";

export const Config = {
    URL: 'https://api.themoviedb.org/',
    IMAGE_URL: 'http://image.tmdb.org/t/p/w185/',
    IMAGE_BACK_DROP_URL_LARGE: '//image.tmdb.org/t/p/w533_and_h300_bestv2//',
    IMAGE_URL_LARGE: '//image.tmdb.org/t/p/w600_and_h900_bestv2/',
    LANGUAGE: 'language=en-US',
    API: {
        VERSION: '3',
        KEY: `api_key=${Credentials.API.KEY}`
    }
}
