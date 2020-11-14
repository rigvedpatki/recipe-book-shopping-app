import { Injectable } from '@angular/core';
import { User } from '../auth/user.model';

@Injectable()
export class LocalStorageService {

  constructor() { }

  setUserData(userData: User): void {
    localStorage.setItem('user', userData.toString());
  }

  getUserData(): User {
    const userStringData: string = localStorage.getItem('user');
    if (userStringData) {
      const userData = JSON.parse(userStringData);
      return new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    } else {
      return null;
    }

  }

  clearAll(): void {
    localStorage.clear();
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }
}
