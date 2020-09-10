import {of} from 'rxjs';
import {ajax as http} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';

const errorHandler = (error) => {
 if (error.response?.message) {
   throw new Error(error.response.message);
 }
 return of(error);
}

// todo
const getAllItems = () => {
  return http.getJSON('/items')
    .pipe(
      map(res => res),
     catchError(error => errorHandler(error))
  );
}


export {
  getAllItems
};
