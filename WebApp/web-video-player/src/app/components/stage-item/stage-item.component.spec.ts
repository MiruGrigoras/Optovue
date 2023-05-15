import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageItemComponent } from './stage-item.component';

describe('StageItemComponent', () => {
  let component: StageItemComponent;
  let fixture: ComponentFixture<StageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
