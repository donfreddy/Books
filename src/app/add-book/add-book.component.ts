import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm;

  constructor(private bookService: BookService, public toastr: ToastrService) { }

  ngOnInit() {

    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
      edition: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    });
  }

  submitBook() {
    console.log(this.bookForm.value);

    this.bookService.addBook(this.bookForm.value);

    this.toastr.success(this.bookForm.controls['title'].value + ' successfully added!');
    this.ResetForm();
  }

  ResetForm() {
    this.bookForm.reset();
  }

}
