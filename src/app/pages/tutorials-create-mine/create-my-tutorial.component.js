import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, ArticleService } from '../../services';

import template from './create-my-tutorial.template.html';

@Component({
  selector: 'create-my-tutorial',
  template
})

export class CreateMyTutorialComponent {
  static get parameters(){
    return [Router, ArticleService, SessionService];
  }
  constructor( router, article, session ){
    this.router = router;
    this.article = article;
    this.session = session;
    this.a = {};
  }
  ngOnInit(){
    this.session.token.subscribe( token => {
      console.log('i got the token'+token);
      this.article.setToken( token );
    })
  }
  save(){
    this.article.post(this.a).then( res => {
      this.router.navigate(['/','dashboard']);
    }, err => {
      this.err = true;
    });

  }
}