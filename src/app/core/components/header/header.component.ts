import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLogged = false;

  constructor(private authService: AuthService, private router: Router) {
  }


  public ngOnInit(): void {
    this.isLogged = this.authService.isTokenValid();
    this.authService.isUserAuthenticated.asObservable()
      .subscribe(value => this.isLogged = value)
  }


  public logOut(): void{
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
