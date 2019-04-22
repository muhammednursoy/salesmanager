import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    error: string;
    private USERNAME_PASSWORD_ERROR = "Kullanıcı adı veya parola hatalı!";

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
        this.authService.login(this.form.get("username").value, this.form.get("password").value)
            .subscribe(
                () => this.onLoginSuccess(),
                errorResponse => this.onLoginError(errorResponse)
                )
    }

    private onLoginSuccess() {
        this.router.navigate(["/secure/shopping"]);
    }

    private onLoginError(errorResponse) {
        if (errorResponse instanceof HttpErrorResponse && errorResponse.status == 401) {
            this.error = this.USERNAME_PASSWORD_ERROR
        }
    }


}
