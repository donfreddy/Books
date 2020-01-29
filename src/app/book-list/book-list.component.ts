import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  list: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit() {

    this.bookService.getBooksList().subscribe(data => {
      this.list = data.map(item => {
        //console.log(item)
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Book;
      })
      //console.log(this.list);
    });
  }

  onDelete(id) {
    if (window.confirm('Voulez-vous vraiment supprimer cette tâche?')) {
      this.bookService.deleteBook(id);
    }
  }
}
