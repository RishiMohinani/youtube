import { Component } from '@angular/core';
import { OtpService } from '../../services/otp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otpmail',
  templateUrl: './otpmail.component.html',
  styleUrls: ['./otpmail.component.css']
})
export class OtpmailComponent {
  email: string = '';
  otp: string = '';
  isOtpSent = false;
  isLoading = false;
  errorMessage: string = '';

  constructor(private otpService: OtpService, private router: Router) {}

  sendOtp() {
    this.isLoading = true;
    this.otpService.sendOtp(this.email).subscribe(
      (response: string) => {
        console.log(response);
        this.isOtpSent = true;
        this.isLoading = false;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error sending OTP', error);
        this.errorMessage = 'Failed to send OTP. Please try again.';
        this.isLoading = false;
      }
    );
  }

  verifyOtp() {
    this.isLoading = true;
    this.otpService.verifyOtp(this.email, this.otp).subscribe(
      (response: string) => {
        console.log(response);
        this.errorMessage = '';
        // Show loader for 1.5 seconds before redirecting
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/home']);  // Redirect to homepage
        }, 1500);
      },
      (error) => {
        console.error('Invalid OTP', error);
        this.errorMessage = 'Invalid OTP. Please check and try again.';
        this.isLoading = false;
      }
    );
  }
}
