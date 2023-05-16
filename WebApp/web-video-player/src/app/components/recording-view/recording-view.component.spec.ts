import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingViewComponent } from './recording-view.component';

describe('RecordingViewComponent', () => {
  let component: RecordingViewComponent;
  let fixture: ComponentFixture<RecordingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
