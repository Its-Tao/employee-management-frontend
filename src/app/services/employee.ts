import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(this.apiUrl);
  }
}
