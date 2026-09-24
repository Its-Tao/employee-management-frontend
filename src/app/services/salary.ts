import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalaryData {
  id: number;
  amount: number;
  paymentDate: string;
  employeeId: number;
}

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private apiUrl = 'http://localhost:8080/salaries';

  constructor(private http: HttpClient) {}

  // GET - Get all salaries
  getSalaries(): Observable<SalaryData[]> {
    return this.http.get<SalaryData[]>(this.apiUrl);
  }

  // POST - Add salary for an employee
  addSalary(
    employeeId: number,
    salary: Omit<SalaryData, 'id' | 'employeeId'>,
  ): Observable<SalaryData> {
    return this.http.post<SalaryData>(`${this.apiUrl}/${employeeId}`, salary);
  }

  // PUT - Update salary
  updateSalary(id: number, salary: Omit<SalaryData, 'id'>): Observable<SalaryData> {
    return this.http.put<SalaryData>(`${this.apiUrl}/${id}`, salary);
  }

  // DELETE - Delete salary
  deleteSalary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
