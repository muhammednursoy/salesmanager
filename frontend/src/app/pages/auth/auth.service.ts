import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {switchMap, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isLoggedIn = false;

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`/api/login?username=${username}&password=${password}`, {}).pipe(tap(() => this.isLoggedIn = true));
    }

    loggedIn(): Observable<any> {
        if (this.isLoggedIn) {
            return of(true);
        }
        return this.http.get("/api/validate-login").pipe(switchMap(response => {
            if (response == null) {
                this.isLoggedIn = false;
            } else {
                this.isLoggedIn = true;
            }
            return of(this.isLoggedIn);
        }));
    }

    logout(): Observable<any> {
        this.isLoggedIn = false;
        return this.http.post("/api/logout", {});
    }
}
