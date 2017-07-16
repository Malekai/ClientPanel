import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  // Initialize firebase observables
  clients: FirebaseListObservable<any[]>
  client: FirebaseObjectObservable<any>

  constructor(
  	// Bind your firebase db to constructor
  	public af:AngularFireDatabase
  ) { 
  	// Get your clients from firebase and create observable of them
  	this.clients = this.af.list('/clients') as FirebaseListObservable<Client[]>;
  }

  getClients() {
  	return this.clients;
  }

}
