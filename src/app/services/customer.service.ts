import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public selected = new CustomerModel();

  private customerCollection: AngularFirestoreCollection<CustomerModel>;
  customers: Observable<CustomerModel[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.customerCollection = afs.collection<CustomerModel>('customers');
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CustomerModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllCustomers() {
    return this.customers;
  }

  addCustomer(customer) {
    return this.customerCollection.add(customer).then(
     () => {
      console.log('Success');
     },
     (error) => {
       console.log(error);
     }
    );
  }

  editCustomer(customer: CustomerModel) {
    return this.customerCollection.doc(customer.id).update(customer);
  }

  deleteCustomer(id: string) {
    return this.customerCollection.doc(id).delete();
  }
}
