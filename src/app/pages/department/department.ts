import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DepartmentService, DepartmentData } from '../../services/department';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  departments: DepartmentData[] = [];

  newDepartment: Omit<DepartmentData, 'id'> = {
    name: '',
    description: '',
  };

  editingDepartmentId: number | null = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  // GET
  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (data: DepartmentData[]) => {
        this.departments = data;
      },

      error: (error: any) => {
        console.error('Error loading departments:', error);
      },
    });
  }

  // ADD
  addDepartment(): void {
    this.departmentService.addDepartment(this.newDepartment).subscribe({
      next: (department: DepartmentData) => {
        this.departments.push(department);

        this.resetForm();

        console.log('Department added successfully');
      },

      error: (error: any) => {
        console.error('Error adding department:', error);
      },
    });
  }

  // EDIT
  editDepartment(department: DepartmentData): void {
    this.editingDepartmentId = department.id;

    this.newDepartment = {
      name: department.name,
      description: department.description,
    };
  }

  // UPDATE
  updateDepartment(): void {
    if (this.editingDepartmentId === null) {
      return;
    }

    this.departmentService
      .updateDepartment(this.editingDepartmentId, this.newDepartment)
      .subscribe({
        next: (updatedDepartment: DepartmentData) => {
          const index = this.departments.findIndex(
            (department) => department.id === updatedDepartment.id,
          );

          if (index !== -1) {
            this.departments[index] = updatedDepartment;
          }

          this.resetForm();

          console.log('Department updated successfully');
        },

        error: (error: any) => {
          console.error('Error updating department:', error);
        },
      });
  }

  // DELETE
  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.departments = this.departments.filter((department) => department.id !== id);

        console.log('Department deleted successfully');
      },

      error: (error: any) => {
        console.error('Error deleting department:', error);
      },
    });
  }

  // RESET FORM
  resetForm(): void {
    this.newDepartment = {
      name: '',
      description: '',
    };

    this.editingDepartmentId = null;
  }
}
