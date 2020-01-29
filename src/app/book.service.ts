import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private db: AngularFirestore) { }

  addBook(book: Book) {

    this.db.collection('books').add(book)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  getBook(id: string) {
    return this.db.doc('books/' + id);
  }

  getBooksList() {
    return this.db.collection('books').snapshotChanges();
  }

  updateBook(book: Book) {
    let id = book.id;
    delete book.id;

    this.db.doc('books/' + id).update(book);
  }

  deleteBook(id) {

    this.db.doc('books/' + id).delete();
  }
}
