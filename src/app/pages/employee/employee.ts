import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService, EmployeeData } from '../../services/employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employees: EmployeeData[] = [];

  newEmployee: Omit<EmployeeData, 'id'> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: 0,
  };

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

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: (employee: EmployeeData) => {
        this.employees.push(employee);

        this.newEmployee = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          department: '',
          position: '',
          salary: 0,
        };

        console.log('Employee added successfully');
      },

      error: (error: any) => {
        console.error('Error adding employee:', error);
      },
    });
  }

  editEmployee(employee: EmployeeData): void {
    this.newEmployee = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
    };
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter((employee) => employee.id !== id);

        console.log('Employee deleted successfully');
      },

      error: (error: any) => {
        console.error('Error deleting employee:', error);
      },
    });
  }
}
