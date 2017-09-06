import { Component, ViewEncapsulation } from '@angular/core';
import { SessionService, ArticleService } from '../services';

import template from './main.page.html';

import style from '../stylesheets/main.scss';

@Component({
  selector: 'app',
  template,
  styles: [ style ],
  encapsulation: ViewEncapsulation.None,
})

export class MainPage {
  static get parameters(){
    return [SessionService, ArticleService];
  }

  constructor( session, article ){
    this.session = session;
    this.article = article;
  }

  auth( token ){
    if( !token ) {
      window.location.href = '/';
    } else {
      this.article.setToken( token );
      this.session.notify( token );
    }
  }
}

