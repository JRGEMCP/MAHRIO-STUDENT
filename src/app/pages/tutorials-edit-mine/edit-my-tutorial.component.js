import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'mahrio-header/src/services';
import { Article } from 'mahrio-header/src/models';

import template from './edit-my-tutorial.template.html';

@Component({
  selector: 'edit-my-tutorial',
  template,
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
    } else {
      if( !this.a.sections ) {
        this.articleService.gett(null, true, this.route.params.value.id).toPromise()
          .then( res => {
            this.a = Article.fromPayload(res.articles[0]);
            this.articleService.currentArticle = Article.fromPayload(res.articles[0]);
          })
      }
    }
  }
  ngOnDestroy(){
    if(this._subs) {
      this._subs.unsubscribe();
    }
  }
  save(){
    console.log( this.a );
    this.articleService.put(this.a).then( res => {
      this.router.navigate(['/','dashboard']);
    }, err => {
      this.err = true;
    });
  }
}