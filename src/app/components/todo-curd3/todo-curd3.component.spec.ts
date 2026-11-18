import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCurd3Component } from './todo-curd3.component';

describe('TodoCurd3Component', () => {
  let component: TodoCurd3Component;
  let fixture: ComponentFixture<TodoCurd3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCurd3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCurd3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
