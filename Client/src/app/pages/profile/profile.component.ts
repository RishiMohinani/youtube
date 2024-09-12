import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  mobileNumber: string = '';
  address: string = '';
  postcode: string = '';
  state: string = '';
  email: string = '';
  country: string = '';
  stateRegion: string = '';
  
  selectedGender: string = 'male';
  selectedAvatar: string = '';
  profileAvatar: string = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  maleAvatars: string[] = [
    'male-avatar1.jpg', 'male-avatar2.jpg', 'male-avatar3.jpg' // Ensure these are correct paths
  ];
  
  femaleAvatars: string[] = [
    'female-avatar1.jpg', 'female-avatar2.jpg', 'female-avatar3.jpg' // Ensure these are correct paths
  ];
  
  avatarOptions: string[] = [];

  ngOnInit() {
    this.updateAvatarOptions();
  }

  onGenderChange() {
    this.updateAvatarOptions();
  }

  updateAvatarOptions() {
    this.avatarOptions = this.selectedGender === 'male' ? this.maleAvatars : this.femaleAvatars;
    this.selectedAvatar = this.avatarOptions.length ? this.avatarOptions[0] : '';
    this.updateProfileAvatar(this.selectedAvatar);
  }

  updateProfileAvatar(avatar: string) {
    this.profileAvatar = `path/to/avatars/${avatar}`; // Ensure correct path
  }

  saveProfile() {
    // Logic to save profile information
    console.log('Profile saved');
  }
}
