import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-form-modal-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  errorMessage: string;
  error: boolean;

  constructor(
    public customer: CustomerService,
    private dialogRef: MatDialogRef<CustomersComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }

  onSaveForm() {
    if (this.customer.selected.id == null) {

      const newCustomer = {
        name : this.customer.selected.name,
        sex : this.customer.selected.sex,
        city : this.customer.selected.city,
        order : this.customer.selected.order,
      };
      this.customer.addCustomer(newCustomer);
      this.close();
    } else {
        this.customer.editCustomer(this.customer.selected);
        this.close();
    }
  }

  close(): void {
    this.error = false;
    this.dialogRef.close();
  }

}
