import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CustomerService } from '../../services/customer.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CustomersComponent } from '../form/customers/customers.component';
import { CustomerModel } from 'src/app/models/customer.model';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';


@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'sex', 'city', 'order', 'actions', 'new'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(res => this.dataSource.data = res);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element) {
    this.resetForm();
    this.openDialog();
    if (element) {
      this.customerService.selected = element;
    }
  }

  onDelete(id: string) {
    this.confirmDialog.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.customerService.deleteCustomer(id).then(
          () => {
            console.log('DELETE', 'DELETE SUCCESSFULL');
          }, (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  openDialog(): void {
    this.dialog.open(CustomersComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: '10px'}
    });
    /*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Modal'
    };
    dialogConfig.autoFocus = true;
    */
  }

  resetForm() {
    this.customerService.selected = new CustomerModel();
  }

}
