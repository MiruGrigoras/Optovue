import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDisabledDialogComponent } from './logs-disabled-dialog.component';

describe('LogsDisabledDialogComponent', () => {
  let component: LogsDisabledDialogComponent;
  let fixture: ComponentFixture<LogsDisabledDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsDisabledDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsDisabledDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
