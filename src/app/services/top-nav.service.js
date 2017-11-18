import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class TopNavService {
  constructor(){
    this._sections = new ReplaySubject(null);
    this._section = new ReplaySubject(null);
    this._save = new ReplaySubject(null);
  }

  set sections( val ){
    this._sections.next( val );
  }

  get sections(){
    return this._sections;
  }

  set section( val ){
    this._section.next( val );
  }
  get section(){
    return this._section;
  }
  set save( val ) {
    this._save.next( val );
  }
  get save(){
    return this._save;
  }
}