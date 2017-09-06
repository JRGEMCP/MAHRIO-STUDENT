import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SessionService{
  constructor(){
    this.token = new ReplaySubject(null);
  }

  notify( token ){
    this.token.next( token );
  }
}