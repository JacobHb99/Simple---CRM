import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../models/product.class';


@Component({
  selector: 'app-single-order-input',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './single-order-input.component.html',
  styleUrl: './single-order-input.component.scss'
})
export class SingleOrderInputComponent {
  @Input() isLoading: boolean = false;
  @Input() allProducts = Array();
  selectedValues!: any;
  amount: number = 1;
  @Output() singleProduct: any = new EventEmitter<any>();


  ngOnInit() {
    this.createSingleOrderTask();
  }

  createSingleOrderTask() {
    if (this.selectedValues) {
      this.selectedValues.amount = this.amount;
    }
    this.singleProduct.emit(this.selectedValues);
  }


}
