import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RoleService, RoleData } from '../../services/role';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class Role implements OnInit {
  roles: RoleData[] = [];

  newRole: Omit<RoleData, 'id'> = {
    name: '',
    description: '',
  };

  editingRoleId: number | null = null;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  // Load all roles
  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (data: RoleData[]) => {
        this.roles = data;
      },

      error: (error: any) => {
        console.error('Error loading roles:', error);
      },
    });
  }

  // Add a new role
  addRole(): void {
    this.roleService.addRole(this.newRole).subscribe({
      next: (role: RoleData) => {
        this.roles.push(role);

        this.resetForm();

        console.log('Role added successfully');
      },

      error: (error: any) => {
        console.error('Error adding role:', error);
      },
    });
  }

  // Put selected role into the form
  editRole(role: RoleData): void {
    this.editingRoleId = role.id;

    this.newRole = {
      name: role.name,
      description: role.description,
    };
  }

  // Update an existing role
  updateRole(): void {
    if (this.editingRoleId === null) {
      return;
    }

    this.roleService.updateRole(this.editingRoleId, this.newRole).subscribe({
      next: (updatedRole: RoleData) => {
        const index = this.roles.findIndex((role) => role.id === updatedRole.id);

        if (index !== -1) {
          this.roles[index] = updatedRole;
        }

        this.resetForm();

        console.log('Role updated successfully');
      },

      error: (error: any) => {
        console.error('Error updating role:', error);
      },
    });
  }

  // Delete a role
  deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe({
      next: () => {
        this.roles = this.roles.filter((role) => role.id !== id);

        console.log('Role deleted successfully');
      },

      error: (error: any) => {
        console.error('Error deleting role:', error);
      },
    });
  }

  // Reset the form
  resetForm(): void {
    this.newRole = {
      name: '',
      description: '',
    };

    this.editingRoleId = null;
  }
}
