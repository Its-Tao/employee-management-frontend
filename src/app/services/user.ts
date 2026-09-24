import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserData {
  id: number;
  username: string;
  password: string;
  email: string;
  employeeId: number;
  roleId: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl);
  }

  // Add a new user
  addUser(user: Omit<UserData, 'id'>): Observable<UserData> {
    return this.http.post<UserData>(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(id: number, user: Omit<UserData, 'id'>): Observable<UserData> {
    return this.http.put<UserData>(`${this.apiUrl}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
