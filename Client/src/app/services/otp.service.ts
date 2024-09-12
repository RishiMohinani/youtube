import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Send OTP with responseType set to 'text' to handle plain text responses
  sendOtp(email: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/send-otp`, { email }, { responseType: 'text' });
  }

  // Verify OTP with responseType set to 'text' to handle plain text responses
  verifyOtp(email: string, otp: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { email, otp }, { responseType: 'text' });
  }
}
