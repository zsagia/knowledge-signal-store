import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdminEditComponent } from './books-admin-edit.component';

describe('BooksAdminEditComponent', () => {
  let component: BooksAdminEditComponent;
  let fixture: ComponentFixture<BooksAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksAdminEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
