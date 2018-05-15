import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'mahrio-header/src/services';
import { Article } from 'mahrio-header/src/models';

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
    this.alert = null;
    this.n = 1;
    this.state = 'DISCOVERING';
  }
  save(){
    this.articleService.post(this.a).then( res => {
      this.alert = {success: 'Article discovery created.', dismiss: 3000};
      this.n = 2;
      setTimeout( () => {
        this.articleService.currentArticle = Article.fromPayload(res.article);
        this.router.navigate(['/', 'dashboard', 'my-tutorials', res.article._id, 'edit']);
      }, 3000);
    }, err => {
      this.err = true;
      this.alert = {danger: 'Article discovery failed.'};
    });
  }
  resetAlert(){
    this.alert = null;
  }
}