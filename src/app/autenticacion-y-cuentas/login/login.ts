import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // Estados de los campos
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  
  // Estados de focus
  emailFocused: boolean = false;
  passwordFocused: boolean = false;
  
  // Estados de validación
  emailError: boolean = false;
  passwordError: boolean = false;
  
  // Estados de UI
  errorMessage: string = '';
  loading: boolean = false;
  showPassword: boolean = false;
  
  // Estados de animaciones
  showSuccessAnimation: boolean = false;

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.checkRememberedUser();
  }

  /**
   * Verifica si hay un usuario recordado y autocompleta los campos
   */
  private checkRememberedUser(): void {
    // Solo ejecutar en el navegador para evitar errores de SSR
    if (typeof window !== 'undefined') {
      const rememberedEmail = this.localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        this.email = rememberedEmail;
        this.rememberMe = true;
      }
    }
  }

  /**
   * Valida el email en tiempo real
   */
  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = this.email.length > 0 && !emailRegex.test(this.email);
  }

  /**
   * Valida la contraseña en tiempo real
   */
  validatePassword(): void {
    this.passwordError = this.password.length > 0 && this.password.length < 6;
  }

  /**
   * Función principal de login
   */
  onLogin(): void {
    this.clearErrors();
    this.validateForm();
    
    if (this.emailError || this.passwordError) {
      return;
    }

    this.loading = true;
    this.showLoadingAnimation();

    if (!this.email || !this.password) {
      this.handleValidationError('Por favor ingrese email y contraseña');
      return;
    }

    const credentials: LoginRequest = {
      email: this.email.trim().toLowerCase(),
      password: this.password
    };

    // Simular delay de red para mostrar la animación
    setTimeout(() => {
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.handleLoginSuccess(response);
        },
        error: (error) => {
          this.handleLoginError(error);
        }
      });
    }, 1500);
  }

  /**
   * Maneja el éxito del login
   */
  private handleLoginSuccess(response: any): void {
    this.loading = false;
    this.showSuccessAnimation = true;
    
    // Guardar email si se marcó "recordar"
    if (typeof window !== 'undefined') {
      if (this.rememberMe) {
        this.localStorage.setItem('rememberedEmail', this.email);
      } else {
        this.localStorage.removeItem('rememberedEmail');
      }
    }

    // Mostrar animación de éxito
    setTimeout(() => {
      console.log('Login exitoso:', response);
      this.router.navigate(['/crear-proceso']);
    }, 1000);
  }

  /**
   * Maneja los errores de login
   */
  private handleLoginError(error: any): void {
    this.loading = false;
    
    console.error('Error en login:', error);
    
    // Determinar mensaje de error basado en el tipo de error
    let errorMsg = 'Credenciales inválidas';
    
    if (error.status === 404) {
      errorMsg = 'Usuario no encontrado';
    } else if (error.status === 401) {
      errorMsg = 'Email o contraseña incorrectos';
    } else if (error.status === 429) {
      errorMsg = 'Demasiados intentos. Intenta más tarde';
    } else if (error.status === 0) {
      errorMsg = 'Error de conexión. Verifica tu internet';
    } else if (error.status >= 500) {
      errorMsg = 'Error del servidor. Intenta más tarde';
    } else if (error.message?.includes('Network')) {
      errorMsg = 'Error de conexión. Verifica tu internet';
    }

    this.errorMessage = errorMsg;
    
    // Animación de shake en la tarjeta
    this.shakeCard();
    
    // Limpiar mensaje de error después de 5 segundos
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  /**
   * Maneja errores de validación
   */
  private handleValidationError(message: string): void {
    this.loading = false;
    this.errorMessage = message;
    
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  /**
   * Valida todos los campos del formulario
   */
  private validateForm(): void {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !this.email || !emailRegex.test(this.email);
    
    // Validar contraseña
    this.passwordError = !this.password || this.password.length < 6;
  }

  /**
   * Limpia todos los errores
   */
  private clearErrors(): void {
    this.emailError = false;
    this.passwordError = false;
    this.errorMessage = '';
  }

  /**
   * Muestra animación de loading
   */
  private showLoadingAnimation(): void {
    // La animación se maneja a través de las clases CSS
  }

  /**
   * Hace shake a la tarjeta de login
   */
  private shakeCard(): void {
    // Solo ejecutar en el navegador para evitar errores de SSR
    if (typeof window !== 'undefined') {
      const card = document.querySelector('.login-card') as HTMLElement;
      if (card) {
        card.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          card.style.animation = '';
        }, 500);
      }
    }
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Maneja el evento de focus en el email
   */
  onEmailFocus(): void {
    this.emailFocused = true;
  }

  /**
   * Maneja el evento de blur en el email
   */
  onEmailBlur(): void {
    this.emailFocused = false;
    this.validateEmail();
  }

  /**
   * Maneja el evento de focus en la contraseña
   */
  onPasswordFocus(): void {
    this.passwordFocused = true;
  }

  /**
   * Maneja el evento de blur en la contraseña
   */
  onPasswordBlur(): void {
    this.passwordFocused = false;
    this.validatePassword();
  }

  /**
   * Obtiene el mensaje de error para mostrar
   */
  getErrorMessage(): string {
    if (this.emailError) {
      return 'Por favor ingresa un email válido';
    }
    if (this.passwordError) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return this.errorMessage;
  }

  /**
   * Verifica si el formulario es válido
   */
  isFormValid(): boolean {
    return this.email.length > 0 && 
           this.password.length > 0 && 
           !this.emailError && 
           !this.passwordError;
  }

  /**
   * Obtiene el estado del botón de submit
   */
  getSubmitButtonState(): string {
    if (this.loading) return 'loading';
    if (!this.isFormValid()) return 'disabled';
    return 'enabled';
  }

  /**
   * Maneja el login con Google (para futuras implementaciones)
   */
  loginWithGoogle(): void {
    console.log('Login con Google - funcionalidad futura');
    // Implementación futura
  }

  /**
   * Maneja el login con Microsoft (para futuras implementaciones)
   */
  loginWithMicrosoft(): void {
    console.log('Login con Microsoft - funcionalidad futura');
    // Implementación futura
  }

  /**
   * Configura eventos de teclado
   */
  private setupKeyboardEvents(): void {
    // Solo configurar eventos en el navegador para evitar errores de SSR
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && this.isFormValid() && !this.loading) {
          this.onLogin();
        }
        
        // Escape para limpiar errores
        if (event.key === 'Escape') {
          this.clearErrors();
        }
      });
    }
  }

  /**
   * Lifecycle hook - OnInit
   */
  ngOnInit(): void {
    // Configuraciones adicionales al inicializar el componente
    this.setupKeyboardEvents();
  }

  /**
   * Lifecycle hook - OnDestroy
   */
  ngOnDestroy(): void {
    // Limpiar event listeners solo en el navegador
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', () => {});
    }
  }
}