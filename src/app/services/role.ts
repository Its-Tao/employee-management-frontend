import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RoleData {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) {}

  // Get all roles
  getRoles(): Observable<RoleData[]> {
    return this.http.get<RoleData[]>(this.apiUrl);
  }

  // Add a new role
  addRole(role: Omit<RoleData, 'id'>): Observable<RoleData> {
    return this.http.post<RoleData>(this.apiUrl, role);
  }

  // update an existing role
  updateRole(id: number, role: Omit<RoleData, 'id'>): Observable<RoleData> {
    return this.http.put<RoleData>(`${this.apiUrl}/${id}`, role);
  }

  //  Delete a role
  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
