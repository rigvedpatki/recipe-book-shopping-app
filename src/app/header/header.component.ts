import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  subs: Array<Subscription>;
  isUserAuthenticated: boolean;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subs = [];
    this.isUserAuthenticated = false;

    const userSub = this.authService.userSubject.subscribe((user: User) => {
      this.isUserAuthenticated = !!user;
    });

    this.subs.push(userSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onSaveData(): void {
    this.dataStorageService.saveRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
