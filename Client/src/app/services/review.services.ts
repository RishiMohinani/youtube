import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private firestore: AngularFirestore) {}

  submitReview(review: { rating: string; comment: string }) {
    return this.firestore.collection('reviews').add(review);
  }

  getReviews() {
    return this.firestore.collection('reviews').valueChanges();
  }
}
