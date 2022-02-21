import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookModule } from '../../book.module';
import { BookModel } from '../../models/book.model';
import { CategoryService } from '../../services/category.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;
  bookId: string = this.route.snapshot.params.id;
  isAddMode: boolean = !this.bookId;
  categoriesName: String[] = [];
  imgSrc: any = '';

  @Input() book: BookModel;
  @Output() onSubmit = new EventEmitter;
  @Output() onEmitValues = new EventEmitter();

  constructor(private route: ActivatedRoute, private modalService: ModalService, private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.categoryService.getCategoriesName().subscribe(data => this.categoriesName = data);

    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z .,]*$')]),
      category: new FormControl('', Validators.required),
      publishingHouse: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required)
    });

    if(this.isEditMode()){
      this.bookForm.patchValue(this.book);
    } 
  }

  isEditMode(){
    return this.book ? true : false;
  }

  isAuthorValid(){
    return (this.bookForm.controls.author.valid || this.bookForm.controls.author.pristine);
  }

  isPriceValid(){
    return (this.bookForm.controls.price.valid || this.bookForm.controls.price.pristine);
  }

  isFormValid(){
    if(!this.bookForm.controls.imageUrl.valid){
      return false;
    }
    if(!this.imgSrc){
      if(this.bookForm.pristine && this.bookForm.valid){
        return false;
      }
      if(!this.bookForm.dirty && this.bookForm.invalid){
        return false;
      }
    }
    return true;
  }

  submit(){
    if(this.bookForm.valid){
      this.onSubmit.emit(this.bookForm.value);
    }
  }

  submitPressed(){
    this.onEmitValues.emit(this.bookForm.value);
    this.modalService.setBook(this.bookForm.value);
  }

  openConfirmModal(template: TemplateRef<any>){
    this.modalService.openConfirmModal(template);
  }

  onUploadBookImage(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.imgSrc = e.target.result;
        this.bookForm.get('imageUrl')?.patchValue(this.imgSrc);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    else{
      this.imgSrc = this.imgSrc;
    }
  }

  closeForm(){
    this.modalService.closeForm();
  }

}
