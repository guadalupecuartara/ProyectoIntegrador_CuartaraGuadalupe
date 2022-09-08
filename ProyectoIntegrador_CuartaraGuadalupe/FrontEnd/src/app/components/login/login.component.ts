import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService} from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password! : string;
  roles: string[] = [];
  errMsj!: string; 
  authService: any;

  constructor(private TokenService: TokenService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.TokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.TokenService.getAuthorities();
    }
  }

  onLoggin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
        this.authService.login(this.loginUsuario).subscribe((data: { token: string; nombreUsuario: string; authorities: string[]; }) =>{
        this.isLogged = true;
        this.isLogginFail = false;
        this.TokenService.setToken(data.token);
        this.TokenService.setUserName(data.nombreUsuario);
        this.TokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate([''])
      }, (err: { error: { mensaje: string; }; }) =>{
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj= err.error.mensaje;
        console.log(this.errMsj);

      })
  }
}
