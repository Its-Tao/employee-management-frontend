import { Component, OnInit } from '@angular/core';
import { EmployeeService, EmployeeData } from '../../services/employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employees: EmployeeData[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: EmployeeData[]) => {
        this.employees = data;
      },

      error: (error: any) => {
        console.error('Error loading employees:', error);
      },
    });
  }
}
