import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'mahrio-header/src/services';
import { Article } from 'mahrio-header/src/models';

import template from './edit-my-tutorial.template.html';

@Component({
  selector: 'edit-my-tutorial',
  template
})

export class EditMyTutorialComponent {
  static get parameters(){
    return [ActivatedRoute, Router, ArticleService];
  }
  constructor( route, router, articleService ){
    this.route = route;
    this.router = router;
    this.articleService = articleService;
    this.a = {};
    this.alert = null;
    this.n = 1;
  }
  ngOnInit(){
    this.a = this.articleService.currentArticle;
    if( !this.a ) {
      this.a = {};
      this._subs = this.articleService.token
        .flatMap( token => this.articleService.gett(null, true, this.route.params.value.id) )
        .catch( () => { console.log('catcheeed') })
        .subscribe( res => {
          this.a = Article.fromPayload(res.articles[0]) || {};
          this.articleService.currentArticle = this.a;
         });
    }
  }
  ngOnDestroy(){
    if(this._subs) {
      this._subs.unsubscribe();
    }
  }
  save(){
    this.articleService.put(this.a).then( res => {
      this.alert = {success: 'Article discovery saved.', dismiss: 3000};
    }, err => {
      this.alert = {danger: 'Article update failed.'};
    });
  }
  resetAlert(){
    this.alert = null;
  }
  onTagChanged( tags ){ console.log(tags);
    this.articleService.tags( {tags: tags, _id: this.a.id} ).then( res => {
      console.log(res);
    })
  }
}