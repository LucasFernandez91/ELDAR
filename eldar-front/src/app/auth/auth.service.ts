import { Injectable } from '@angular/core';
import { User } from '../interfaces/index';
import { HttpClient } from '@angular/common/http';
import { RegisterPostData } from '../interfaces/auth';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  private loggedInUser: User | null = null; 

  constructor(private http: HttpClient) {}

  registerUser(postData: RegisterPostData, isAdmin: boolean = false) {
    postData.role = isAdmin ? 'admin' : 'user'; 
    return this.http.post<User>(`${this.baseUrl}/users`, postData);
  }

  getUserDetail(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`);
  }

  // Método para obtener el userId del usuario autenticado
getCurrentUserId(): number | null {
  return this.loggedInUser ? this.loggedInUser.id : null; // Devuelve el ID del usuario si está autenticado
}

  // Método para iniciar sesión y almacenar el usuario
login(email: string, password: string): Observable<boolean> {
  return this.getUserDetail(email, password).pipe(
    map(users => {
      if (users.length > 0) {
        this.loggedInUser = users[0]; // Almacena el usuario
        sessionStorage.setItem('email', email); // Almacena en sessionStorage
        return true;
      }
      return false;
    }),
    catchError(() => {
      return of(false); // Devuelve false en caso de error
    })
  );
}

  isLoggedIn(): boolean {
    return this.loggedInUser !== null || sessionStorage.getItem('email') !== null;
  }

  getRole(): string | null {
    return this.loggedInUser ? this.loggedInUser.role : null;
  }

  logout(): void {
    this.loggedInUser = null;
    sessionStorage.removeItem('email'); 
  }


}


