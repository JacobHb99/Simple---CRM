import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-order-per-day-chart',
  standalone: true,
  imports: [],
  templateUrl: './order-per-day-chart.component.html',
  styleUrl: './order-per-day-chart.component.scss'
})
export class OrderPerDayChartComponent {
  chart!: any;
  @Input() data!: any;
   /**
   * Creates chart.
   * @param chartId 
   * @param chartType 
   * @param data 
   * @param label 
   * @param color 
   */
   
}
