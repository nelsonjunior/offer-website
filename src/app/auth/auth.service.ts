import { Injectable } from '@angular/core';
import { NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import Amplify, { Auth, I18n } from 'aws-amplify';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject, catchError, from, map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser, User } from './auth.model';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  lastWindowRef = new BehaviorSubject<NbWindowRef | null>(null);

  private authenticationSubject: BehaviorSubject<boolean>;

  constructor(
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private ngxLoaderService: NgxUiLoaderService
  ) {

    Amplify.configure({
      Auth: environment.cognito,
      I18n: I18n.setLanguage('pt-BR')
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);

    Auth.currentSession()
      .then((session) => this.authenticationSubject.next(!!session))
      .catch(() => this.authenticationSubject.next(false));
  }

  public get authenticated$(): Observable<boolean> {
    return this.authenticationSubject.asObservable();
  }

  public openLogin(): void {

    this.closeLastWindow();

    const wRef = this.windowService.open(LoginComponent, {
      title: 'Publique já sua oferta!',
      closeOnEsc: false,
      buttons: {
        minimize: false,
        maximize: false,
        fullScreen: false
      }
    });

    this.lastWindowRef.next(wRef);
  }

  public openRegister(): void {

    this.closeLastWindow();

    const wRef = this.windowService.open(RegisterComponent, {
      title: 'Publique já sua oferta!',
      closeOnEsc: false,
      buttons: {
        minimize: false,
        maximize: false,
        fullScreen: false
      }
    });

    this.lastWindowRef.next(wRef);
  }

  public login(user: User | CreateUser): Promise<any> {
    this.ngxLoaderService.start('login');

    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
      this.closeLastWindow();
    })
    .finally(() => {
      this.ngxLoaderService.stop('login');
    });
  }

  public logout(): Promise<any> {
    this.ngxLoaderService.start('logout');

    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    })
    .catch((error) => {
      this.toastrService.danger(error.message, 'Erro');
      throw error;
    })
    .finally(() => {
      this.ngxLoaderService.stop('logout');
    });
  }

  public signUp(user: CreateUser): Promise<any> {

    this.ngxLoaderService.start('signUp');

    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        name: user.name
      }
    })
    .finally(() => {
      this.ngxLoaderService.stop('signUp');
    });
  }

  public confirmSignUp(email: string, code: string): Promise<any> {
    this.ngxLoaderService.start('confirmSignUp');

    return Auth.confirmSignUp(email, code)
    .finally(() => {
      this.ngxLoaderService.stop('confirmSignUp');
    });
  }

  public isAuthenticated(): Observable<boolean> {

    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.authenticationSubject.next(true);
          return true;
        }),
        catchError(error => {
          this.authenticationSubject.next(false);
          return of(false);
        })
      );
  }

  public currentSession(): Promise<any> {
    return Auth.currentSession();
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public closeLastWindow(): void {
    if(this.lastWindowRef.value) {
      this.lastWindowRef.value.close();
    }
  }

}
