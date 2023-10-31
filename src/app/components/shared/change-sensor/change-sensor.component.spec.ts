import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSensorComponent } from './change-sensor.component';

describe('ChangeSensorComponent', () => {
  let component: ChangeSensorComponent;
  let fixture: ComponentFixture<ChangeSensorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeSensorComponent]
    });
    fixture = TestBed.createComponent(ChangeSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
