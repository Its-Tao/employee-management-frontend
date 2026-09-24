import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService, UserData } from '../../../services/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  // Store all users retrieved from the backend
  users: UserData[] = [];

  // Data for the Add/Edit form
  newUser: Omit<UserData, 'id'> = {
    username: '',
    password: '',
    email: '',
    employeeId: 0,
    roleId: 0,
  };

  // Stores the ID when we are editing a user
  editingUserId: number | null = null;

  constructor(private userService: UserService) {}

  // Runs when the User page is opened
  ngOnInit(): void {
    this.loadUsers();
  }

  //  Load all users
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: UserData[]) => {
        this.users = data;
      },

      error: (error: any) => {
        console.error('Error loading users:', error);
      },
    });
  }

  // Add a new user
  addUser(): void {
    this.userService.addUser(this.newUser).subscribe({
      next: (user: UserData) => {
        this.users.push(user);

        this.resetForm();

        console.log('User added successfully');
      },

      error: (error: any) => {
        console.error('Error adding user:', error);
      },
    });
  }

  //  Put selected user information into the form
  editUser(user: UserData): void {
    this.editingUserId = user.id;

    this.newUser = {
      username: user.username,
      password: '',
      email: user.email,
      employeeId: user.employeeId,
      roleId: user.roleId,
    };
  }

  //  Update an existing user
  updateUser(): void {
    if (this.editingUserId === null) {
      return;
    }

    this.userService.updateUser(this.editingUserId, this.newUser).subscribe({
      next: (updatedUser: UserData) => {
        const index = this.users.findIndex((user) => user.id === updatedUser.id);

        if (index !== -1) {
          this.users[index] = updatedUser;
        }

        this.resetForm();

        console.log('User updated successfully');
      },

      error: (error: any) => {
        console.error('Error updating user:', error);
      },
    });
  }

  //  Delete a user
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);

        console.log('User deleted successfully');
      },

      error: (error: any) => {
        console.error('Error deleting user:', error);
      },
    });
  }

  // Reset the form
  resetForm(): void {
    this.newUser = {
      username: '',
      password: '',
      email: '',
      employeeId: 0,
      roleId: 0,
    };

    this.editingUserId = null;
  }
}
