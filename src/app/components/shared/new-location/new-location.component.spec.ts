import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocationComponent } from './new-location.component';

describe('NewLocationComponent', () => {
  let component: NewLocationComponent;
  let fixture: ComponentFixture<NewLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLocationComponent]
    });
    fixture = TestBed.createComponent(NewLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
