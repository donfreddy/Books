import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  editForm: FormGroup;
  id;
  obj:any = {};

  constructor(
    private bookService: BookService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService
  ) { }

  

  ngOnInit() {
    this.editForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
      edition: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    });

    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.bookService.getBook(this.id).valueChanges()
      .subscribe(data => {
        this.editForm.setValue(data);

        console.log(data);
      })
  }

  onUpdate() {
    this.obj = this.editForm.value;
    this.obj.id = this.id;

    
    this.bookService.updateBook(this.obj);

    this.toastr.success(this.editForm.controls['title'].value + ' Successfully updated');
    this.router.navigate(['books']); 
  }

  goBack() {
    this.location.back();
  }

}
1