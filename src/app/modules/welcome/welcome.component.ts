import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MESSAGES } from '@core/constants/messages';
import { LoginService } from '@core/services/login.service';
import { LABELS } from '@core/constants/labels';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@core/constants/local-storage';
import { LocalStorageService } from '@core/services/local-storage.service';
import { HelpersService } from '@core/services/helpers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { LoginRequest } from '@core/interfaces/login.inteface';

@Component({
    selector: 'app-welcome',
    imports: [CommonModule, PrimeComponentsModule, ReactiveFormsModule],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements AfterViewInit {

  private loginService = inject(LoginService);
  private router =  inject(Router);
  private localStorageService = inject(LocalStorageService);
  private helpersService = inject(HelpersService);
  private formBuilder = inject(FormBuilder);

  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  public showLoginForm = signal<boolean>(false);
  public hideBorderTyping = false;
  public formLogin: FormGroup = this.formBuilder.group({
    username: [, [Validators.required]],
    password: [, [Validators.required]],
  });

  ngOnInit(): void {
    if (this.loginService.userId()) this.router.navigate([`/loads`])
    this.loginService.eventDataUserLoaded.subscribe(() => {
      this.router.navigate([`/loads`])
    })
  }

  ngAfterViewInit(): void {
    this.reset();
    setTimeout(() => {
      this.hideBorderTyping = true;
    }, 2500);
    setTimeout(() => {
      this.showLoginForm.set(true);
    }, 500);
  }

  private reset(): void {
    this.formLogin.reset();
  };
  
  public submitLogin() {
    const data: LoginRequest = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };
    this.loginService.login(data).subscribe({
      next: (res) => {
        this.localStorageService.set(LOCAL_STORAGE.TOKEN, res.token);
        this.helpersService.messageNotification("success", "Correcto", `¡${res.username?? ''} Bienvenido!.`, 3000);
      }, complete: () => {
        this.loginService.setUser();
      }
    })
  };
  
}
