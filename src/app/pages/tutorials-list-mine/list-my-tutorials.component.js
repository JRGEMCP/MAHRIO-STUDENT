import { Component } from "@angular/core";
import { ArticleService } from 'mahrio-header/src/services';

import template from './list-my-tutorials.template.html';

@Component({
  selector: 'list-my-tutorials',
  template
})

export class ListMyTutorialsComponent {
  static get parameters(){
    return [ArticleService];
  }
  constructor ( articles ){
    this.articlesService = articles;
    this.articles = [];
  }

  ngOnInit() {
    this.articlesService.gett().then( res=> {
      this.articles = res.articles;
      console.log( this.articles);
    })
  }
}
