import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DepartmentData {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/departments';

  constructor(private http: HttpClient) {}

  // Get all departments
  getDepartments(): Observable<DepartmentData[]> {
    return this.http.get<DepartmentData[]>(this.apiUrl);
  }

  // Add a new department
  addDepartment(department: Omit<DepartmentData, 'id'>): Observable<DepartmentData> {
    return this.http.post<DepartmentData>(this.apiUrl, department);
  }

  // Update an existing department
  updateDepartment(id: number, department: Omit<DepartmentData, 'id'>): Observable<DepartmentData> {
    return this.http.put<DepartmentData>(`${this.apiUrl}/${id}`, department);
  }

  // Delete a department
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
