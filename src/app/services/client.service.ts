import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { AuthService } from './auth.service';

@Injectable()
export class ClientService {
  // Initialize firebase observables
  clients: FirebaseListObservable<any[]>;
  client: FirebaseObjectObservable<any>;
  currentUser: string;

  constructor(
  	// Bind your firebase db to constructor
  	public af:AngularFireDatabase,
    public authService:AuthService
  ) { 
    this.authService.getAuth().subscribe(auth => {
      this.currentUser = auth.uid;
    });
  }

  getClients() {
    // Get your clients from firebase and create observable of them
    this.clients = this.af.list(`users/${this.currentUser}/clients`) as FirebaseListObservable<Client[]>;    
  	return this.clients;
  }

  newClient(client:Client) {
    this.clients.push(client);
  }

  getClient(id:string) {
    this.client = this.af.object(`users/${this.currentUser}/clients/${id}`) as FirebaseObjectObservable<Client>
    return this.client;
  }

  updateClient(id:string, client:Client) {
    return this.clients.update(id, client);
  }

  deleteClient(id:string) {
    this.clients.remove(id);
  }

}
