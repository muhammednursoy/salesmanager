import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    isCollapsed: boolean = true;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout().subscribe(() => this.router.navigate(["/login"]));
    }
}
