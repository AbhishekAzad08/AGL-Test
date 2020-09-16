import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { People } from '../models/people';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
   }
   public getPeople(){
    return this.httpClient.get<People[]>(`${this.baseUrl}/people.json`);
 }
}