import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPerDayChartComponent } from './order-per-day-chart.component';

describe('OrderPerDayChartComponent', () => {
  let component: OrderPerDayChartComponent;
  let fixture: ComponentFixture<OrderPerDayChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPerDayChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderPerDayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
