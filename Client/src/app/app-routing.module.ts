import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ChanneldesignComponent } from './pages/channeldesign/channeldesign.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { ThumbnailComponent } from './pages/thumbnail/thumbnail.component';
import { VideoeditComponent } from './pages/videoedit/videoedit.component';
import { VideosearchComponent } from './pages/videosearch/videosearch.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { OtpmailComponent } from './pages/otpmail/otpmail.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
{ 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},
{
    path: 'login',
    component: LoginComponent

},
{
    path: 'signUp',
    component: SignupComponent
},
{
    path: 'home',
    component: HomepageComponent
},
{
    path: 'head',
    component: HeaderComponent
},
{
    path: 'foot',
    component: FooterComponent
},
{
    path: 'channeldesign',
    component: ChanneldesignComponent
}, {
    path: 'manager',
    component: ManagerComponent
},
{
    path: 'podcast',
    component: PodcastComponent
},
{
    path: 'thumbnail',
    component: ThumbnailComponent
},
{
    path: 'edit',
    component: VideoeditComponent
},
{
    path: 'video',
    component: VideosearchComponent
},
{
    path: 'phone',
    component: PhoneComponent
},
   { path: 'otp',
    component: OtpmailComponent
   },
   {
    path:'review',
    component: ReviewsComponent
   },
   {
    path: 'profile',
    component: ProfileComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
