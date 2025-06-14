import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdminEdit } from './books-admin-edit';

describe('BooksAdminEdit', () => {
  let component: BooksAdminEdit;
  let fixture: ComponentFixture<BooksAdminEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksAdminEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksAdminEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
