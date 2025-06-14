import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdminList } from './books-admin-list';

describe('BooksAdminList', () => {
  let component: BooksAdminList;
  let fixture: ComponentFixture<BooksAdminList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksAdminList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksAdminList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
