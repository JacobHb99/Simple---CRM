import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-totals-chart',
  standalone: true,
  imports: [],
  templateUrl: './totals-chart.component.html',
  styleUrl: './totals-chart.component.scss'
})
export class TotalsChartComponent {
  chart!: any;
  @Input() data!: any;





}
