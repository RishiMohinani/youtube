
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/state/auth.reducer';
import { Store } from '@ngrx/store';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  error$!: Observable<any>;
  loading: boolean = false; // Spinner
  showPassword: boolean = false; // Show password eye
  showFormErrors: boolean = false;
  userName: string = '';

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    library: FaIconLibrary,
    private store: Store<{ auth: AuthState }>
  ) {
    library.addIcons(faEye, faEyeSlash);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^.{8,}$')]],
      rememberMe: [false]
    });
  
    // Check if a user session exists in localStorage
    const storedData = localStorage.getItem('user');    
    if (storedData) {
      const { uid, expiry } = JSON.parse(storedData);
      
      // Check if the session is still valid
      if (new Date().getTime() > expiry) {
        localStorage.removeItem('user'); // Remove expired session
      } else {
        // You can add additional logic here to validate the session with Firebase if needed
        this.router.navigate(['/home']); // Automatically navigate if the user is already logged in
      }
    }
  }  
  
  async onLogin() {
    this.showFormErrors = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      return;
    }
  
    this.loading = true;
    const { email, password } = this.loginForm.value;
  
    try {
      // Authenticate the user with Firebase
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      console.log('User logged in successfully');
  
      // Store session data in local storage if "Remember Me" is checked
      if (this.loginForm.value.rememberMe && user) {
        const userData = {
          uid: user.uid, // Store only the user's UID
          email: user.email, // Optionally, you can store the user's email
          displayName: user.displayName, // Store the user's display name or username
          expiry: new Date().getTime() + 3600000 // Set session expiry to 1 hour from login time
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
  
      // Redirect the user to the home page or perform other actions upon successful login
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error logging in:', error);
      this.errorMessage = 'Unable to login. Wrong email or password.'; // Display error message to the user
    } finally {
      this.loading = false; // Set loading to false
    }
  }
  
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignUp() {
    this.router.navigate(['/signUp']); // Replace '/signUp' with your actual route path
  }

  onForgotPassword() {
    const email = this.email?.value;
    if (!email) {
      this.errorMessage = 'Please enter your email to reset your password.';
      return;
    }
  
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.errorMessage = 'Password reset email sent. Check your inbox.';
      })
      .catch(error => {
        this.errorMessage = 'Error sending password reset email.';
        console.error(error);
      });
  }

  // Getters for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
