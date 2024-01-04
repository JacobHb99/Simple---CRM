import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderInputComponent } from './single-order-input.component';

describe('SingleOrderInputComponent', () => {
  let component: SingleOrderInputComponent;
  let fixture: ComponentFixture<SingleOrderInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleOrderInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleOrderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
