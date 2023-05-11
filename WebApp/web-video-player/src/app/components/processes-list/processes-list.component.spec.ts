import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesListComponent } from './processes-list.component';

describe('ProcessesListComponent', () => {
  let component: ProcessesListComponent;
  let fixture: ComponentFixture<ProcessesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
