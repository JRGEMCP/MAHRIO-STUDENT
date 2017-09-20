import { Component } from "@angular/core";
import { ArticleService } from 'mahrio-header/src/services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import template from './list-my-tutorials.template.html';
import style from './list-my-tutorials.style.scss';

@Component({
  selector: 'list-my-tutorials',
  template,
  styles: [style],
  inputs: ['id']
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
    this._subs = this.articlesService.token
      .flatMap( token => this.articlesService.gett(null, true) )
      .catch( () => { console.log('catcheeed') })
      .subscribe( res => {
        if(!res.articles.length){
          this.notutorials = true;
        } else {
          this.articles = res.articles;
        }
        this.loaded = true;
      });
  }
  ngOnDestroy(){
    if(this._subs) {
      this._subs.unsubscribe();
    }
  }
}
