/**
 * Created by Mark Webley on 11/09/2020.
 */

import {Credentials} from "./credentials-api-key";

/**
 * @description     this is a temporary solutions,
 *                  my other detailled solutions include more works
 */


export const Config = {
    URL: 'https://api.themoviedb.org/',
    IMAGE_URL: 'http://image.tmdb.org/t/p/w185/',
    LANGUAGE: 'language=en-US',
    API: {
        VERSION: '3',
        KEY: `api_key=${Credentials.API.KEY}`
    }
}
