import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'mahrio-header/src/services';

import template from './design-my-tutorial.template.html';

@Component({
  selector: 'design-my-tutorial',
  template
})

export class DesignMyTutorialComponent {
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
  }
  save(){
    this.articleService.put(this.a).then( res => {
      this.router.navigate(['/','dashboard']);
    }, err => {
      this.err = true;
    });
  }
}