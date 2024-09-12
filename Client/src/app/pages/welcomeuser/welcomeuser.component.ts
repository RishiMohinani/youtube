import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcomeuser',
  templateUrl: './welcomeuser.component.html',
  styleUrls: ['./welcomeuser.component.css']
})
export class WelcomeuserComponent implements OnInit {
  @Input() userName: string = '';
  showModal: boolean = false;

  ngOnInit() {
    // Initially hide the modal
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
