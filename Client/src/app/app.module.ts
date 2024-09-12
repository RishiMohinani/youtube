import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { enviornment } from 'src/assets/Enviornment/enviornment';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from '../app/state/auth.reducer';
import { AuthEffects } from '../app/state/auth.effects';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PhoneComponent } from './pages/phone/phone.component';
import { FormsModule } from '@angular/forms';
import { WelcomeuserComponent } from './pages/welcomeuser/welcomeuser.component';
import { OtpmailComponent } from './pages/otpmail/otpmail.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    PhoneComponent,
    WelcomeuserComponent,
    OtpmailComponent,
    ReviewsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(enviornment.firebaseconfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    HomepageComponent,
    FontAwesomeModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
