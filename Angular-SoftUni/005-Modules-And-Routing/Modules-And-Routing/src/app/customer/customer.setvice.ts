import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs';

export interface IUser {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": number,
      "lng": number
    }
  },
  "phone": string,
  "website": string,
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string
  }
}

export interface IPost {
  "userId": number;
  "id": number;
  "title": string;
  "body": string;
}

export interface IAlbum {
  "userId": number;
  "id": number;
  "title": string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers$(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUserById$(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>('https://jsonplaceholder.typicode.com/users/' + id)
  }

  getPostsByUserId$(id: string): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(map(posts => posts.filter(p => p.userId === +id)))
  }

  getAlbumsByUserId$(id: string): Observable<IAlbum[]> {
    return this.httpClient.get<IAlbum[]>('https://jsonplaceholder.typicode.com/albums')
      .pipe(map(albums => albums.filter(a => a.userId === +id)))
  }

}
