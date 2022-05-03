import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCartPopoverComponent } from './book-cart-popover.component';

describe('BookCartPopoverComponent', () => {
  let component: BookCartPopoverComponent;
  let fixture: ComponentFixture<BookCartPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCartPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCartPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
