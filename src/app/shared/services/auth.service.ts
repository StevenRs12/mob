import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserByName(form: User): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users?name=${form.name}`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${environment.urlAPI}/users?id=${id}`);
  }


  editUser(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.urlAPI}/users/${user.id?.toString()}`, user);
  }


}
