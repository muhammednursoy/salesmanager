import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        public router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            username: ["user", Validators.required],
            password: ["pass", Validators.required],
        })
    }

    login() {
        console.log("login")
        this.authService.login(this.form.get("username").value, this.form.get("password").value).subscribe(() => this.onLoginSuccess(), console.log)
    }

    private onLoginSuccess() {
        console.log("redirect")
        this.router.navigate(["/secure/shopping"]);
    }


}
