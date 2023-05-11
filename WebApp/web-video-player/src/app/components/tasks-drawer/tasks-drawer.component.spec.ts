import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDrawerComponent } from './tasks-drawer.component';

describe('TasksDrawerComponent', () => {
  let component: TasksDrawerComponent;
  let fixture: ComponentFixture<TasksDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
