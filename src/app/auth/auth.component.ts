import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authenticated$.subscribe(authenticated => {
      if(authenticated) {
        this.router.navigate(['/']);
      }
    });
  }

}
