import { Component } from "@angular/core";
import { ArticleService, OauthSessionService, PaginationService } from 'mahrio-header/src/services';
import { Article, FilterModel, NoFilter, SearchByNameFilter } from 'mahrio-header/src/models';
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
    return [ArticleService, OauthSessionService, PaginationService];
  }
  constructor ( articles, oauth, paging ){
    this.articlesService = articles;
    this.oauthService = oauth;
    this.pagingService = paging;
    this.filters = [ new NoFilter() ];
    this.articles = [];
  }

  ngOnInit() {
    this._subs = this.articlesService.token
      .flatMap( token => this.articlesService.gett(null, true) )
      .catch( () => { console.log('catcheeed') })
      .subscribe( res => {
        res.articles.forEach( (article, i) => {
          this.articles.push( Article.fromPayload(article) );
        });
        this.applyFilters();

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
  applyFilters(){
    let apis = [];
    this.filters.forEach( (filterModel) => {
      if( filterModel.isAnd ){
        apis = this.articles.filter(filterModel.filter);
      }
    });

    this.pagingService.items = apis;
    this.pagingService.setPage(0);
  }

  // PAGINATION
  change($event){
    switch($event.type){
      case 'first':
        this.pagingService.first();
        break;
      case 'prev':
        this.pagingService.prev();
        break;
      case 'next':
        this.pagingService.next();
        break;
      case 'last':
        this.pagingService.last();
        break;
      case 'page':
        this.pagingService.setPage( $event.num );
    }
  }
}
