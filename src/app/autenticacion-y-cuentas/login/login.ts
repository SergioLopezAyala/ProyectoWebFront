import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  onLogin() {
    if (this.email && this.password) {
      console.log('Intentando iniciar sesión con:', this.email);
    }
  }
}
