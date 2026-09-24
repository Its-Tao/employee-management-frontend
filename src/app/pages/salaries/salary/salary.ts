import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SalaryService, SalaryData } from '../../../services/salary';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './salary.html',
  styleUrl: './salary.css',
})
export class Salary implements OnInit {
  salaries: SalaryData[] = [];

  newSalary: Omit<SalaryData, 'id'> = {
    amount: 0,
    paymentDate: '',
    employeeId: 0,
  };

  editingSalaryId: number | null = null;

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.loadSalaries();
  }

  // GET - Load all salaries
  loadSalaries(): void {
    this.salaryService.getSalaries().subscribe({
      next: (data: SalaryData[]) => {
        this.salaries = data;
      },

      error: (error: any) => {
        console.error('Error loading salaries:', error);
      },
    });
  }

  // POST - Add salary
  addSalary(): void {
    this.salaryService
      .addSalary(this.newSalary.employeeId, {
        amount: this.newSalary.amount,
        paymentDate: this.newSalary.paymentDate,
      })
      .subscribe({
        next: (salary: SalaryData) => {
          this.salaries.push(salary);

          this.resetForm();

          console.log('Salary added successfully');
        },

        error: (error: any) => {
          console.error('Error adding salary:', error);
        },
      });
  }

  // EDIT
  editSalary(salary: SalaryData): void {
    this.editingSalaryId = salary.id;

    this.newSalary = {
      amount: salary.amount,
      paymentDate: salary.paymentDate,
      employeeId: salary.employeeId,
    };
  }

  // UPDATE
  updateSalary(): void {
    if (this.editingSalaryId === null) {
      return;
    }

    this.salaryService.updateSalary(this.editingSalaryId, this.newSalary).subscribe({
      next: (updatedSalary: SalaryData) => {
        const index = this.salaries.findIndex((salary) => salary.id === updatedSalary.id);

        if (index !== -1) {
          this.salaries[index] = updatedSalary;
        }

        this.resetForm();

        console.log('Salary updated successfully');
      },

      error: (error: any) => {
        console.error('Error updating salary:', error);
      },
    });
  }

  // DELETE
  deleteSalary(id: number): void {
    this.salaryService.deleteSalary(id).subscribe({
      next: () => {
        this.salaries = this.salaries.filter((salary) => salary.id !== id);

        console.log('Salary deleted successfully');
      },

      error: (error: any) => {
        console.error('Error deleting salary:', error);
      },
    });
  }

  // RESET FORM
  resetForm(): void {
    this.newSalary = {
      amount: 0,
      paymentDate: '',
      employeeId: 0,
    };

    this.editingSalaryId = null;
  }
}
