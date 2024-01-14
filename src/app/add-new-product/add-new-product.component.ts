import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { Product } from '../../models/product.class';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.scss'
})
export class AddNewProductComponent {
  firestore: Firestore = inject(Firestore);
  isLoading: boolean = false;
  product = new Product;
  productCollection: any;
  amountToString: string = '';
  priceToString: string = '';


  constructor(public dialogRef: MatDialogRef<AddNewProductComponent>) {
    this.productCollection = collection(this.firestore, 'products');
  }

  /**
   * Sends new data to firestore and controls the loading bar.
   */
  async saveProduct() {    
    this.isLoading = true;
    const docRef = await addDoc(this.productCollection, this.product.toJson());      
    this.isLoading = false;
    this.closeDialog();
  }


  /**
   * Closes the dialog-container.
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
