import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'mahrio-header/src/services';

import template from './create-my-tutorial.template.html';

@Component({
  selector: 'create-my-tutorial',
  template
})

export class CreateMyTutorialComponent {
  static get parameters(){
    return [Router, ArticleService];
  }
  constructor( router, article){
    this.router = router;
    this.articleService = article;
    this.a = {};
  }
  save(){
    this.articleService.post(this.a).then( res => {
      this.router.navigate(['/','dashboard']);
    }, err => {
      this.err = true;
    });

  }
}