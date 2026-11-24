import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCrudComponent } from './post-crud.component';

describe('PostCrudComponent', () => {
  let component: PostCrudComponent;
  let fixture: ComponentFixture<PostCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
