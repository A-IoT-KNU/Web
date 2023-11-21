import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSensorComponent } from './delete-sensor.component';

describe('DeleteSensorComponent', () => {
  let component: DeleteSensorComponent;
  let fixture: ComponentFixture<DeleteSensorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSensorComponent]
    });
    fixture = TestBed.createComponent(DeleteSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
