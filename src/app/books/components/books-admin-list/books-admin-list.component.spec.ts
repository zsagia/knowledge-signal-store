import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdminListComponent } from './books-admin-list.component';

describe('BooksAdminListComponent', () => {
  let component: BooksAdminListComponent;
  let fixture: ComponentFixture<BooksAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
