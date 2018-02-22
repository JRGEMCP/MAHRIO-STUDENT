import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'mahrio-header/src/services';
import { Article } from 'mahrio-header/src/models';

import template from './develop-my-tutorial.template.html';

@Component({
  selector: 'develop-my-tutorial',
  template,
  styles: [ ]
})

export class DevelopMyTutorialComponent {
  static get parameters(){
    return [ActivatedRoute, Router, ArticleService];
  }
  constructor( route, router, articleService ){
    this.route = route;
    this.router = router;
    this.articleService = articleService;
    this.a = {};
    this.n = 4;
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
          this.trySave();
        });
    } else {
      this.trySave();
    }
  }

  textChanged(){
    console.log('saving');
  }

  trySave(){
    if( !this.a.code || !this.a.code.git ) {
      // message to wait
      this.articleService.createCodeRepo(this.a.id)
        .then( (res) => {

          this.alert = {success: 'Code Saved!', dismiss: 3000};
        }); // create code.git
    } else {
      this.text = this.a.code.cache;
      this.articleService.getCodeSha(this.a.id)
        .then( (res) => {
          this.sha = res.sha;
        })
    }
  }
  update(){
    this.articleService.updateCodeRepo(this.a.id, 'saving', this.sha, this.text)
      .then( (res) => {
        this.a.state = 'DEPLOYED';
        this.articleService.currentArticle.code.cache = this.text;
        this.articleService.getCodeSha(this.a.id)
          .then( (res) => {
            this.sha = res.sha;
            this.alert = {success: 'Code Saved!', dismiss: 3000};
          })
      })
  }
  resetAlert(){
    this.alert = null;
  }
}