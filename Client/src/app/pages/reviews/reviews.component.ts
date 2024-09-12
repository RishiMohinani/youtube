import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Import Firebase Auth

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  review = { rating: 0, comment: '', author: '' }; // Include author field
  isReviewSubmitted = false;
  reviews: any[] = [];  // Store reviews fetched from Firestore
  loggedInUserName: string = '';  // To store the logged-in user's name

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth  // Firebase Auth Service
  ) {}

  ngOnInit() {
    // Fetch logged-in user's name from Firebase Authentication
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Check if displayName is available, otherwise use 'Anonymous'
        this.loggedInUserName = user.displayName || 'Anonymous';
      } else {
        // Handle the case where there is no user logged in
        console.warn('No user is logged in.');
        this.loggedInUserName = 'Anonymous';
      }
    });

    // Fetch reviews from Firestore
    this.firestore.collection('reviews').valueChanges().subscribe((data: any) => {
      this.reviews = data;
    }, error => {
      console.error('Error fetching reviews:', error);
    });
  }

  setRating(rating: number) {
    this.review.rating = rating;
  }

  submitReview() {
    if (this.review.rating && this.review.comment) {
      // Ensure the logged-in user's name is assigned to the author field
      this.review.author = this.loggedInUserName;

      // Add review to Firestore
      this.firestore.collection('reviews').add(this.review).then(() => {
        this.isReviewSubmitted = true;

        // Clear form
        this.review = { rating: 0, comment: '', author: '' };

        // After 1.5 seconds, redirect to homepage
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      }).catch(error => {
        console.error('Error adding review:', error);
      });
    } else {
      console.warn('Review is missing rating or comment.');
    }
  }
}
