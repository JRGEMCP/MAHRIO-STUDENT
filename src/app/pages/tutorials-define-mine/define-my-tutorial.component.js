import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService, SectionService, GithubService } from 'mahrio-header/src/services';
import { Article, Section} from 'mahrio-header/src/models';

import template from './define-my-tutorial.template.html';
import style from './define-my-tutorial.style.scss'

@Component({
  selector: 'define-my-tutorial',
  template,
  styles: [style]
})

export class DefineMyTutorialComponent {
  static get parameters(){
    return [ActivatedRoute, Router, ArticleService, SectionService, GithubService];
  }
  constructor( route, router, articleService, sectionService, githubService ){
    this.route = route;
    this.router = router;
    this.articleService = articleService;
    this.sectionService = sectionService;
    this.githubService = githubService;
    this.a = new Article();
    this.s = new Section();
    this.sections = [];
  }
  ngOnInit(){
    this.a = this.articleService.currentArticle;
    if( !this.a ) {
      this.a = new Article();
      this._subs = this.articleService.token
        .flatMap( token => this.articleService.gett(null, true, this.route.params.value.id) )
        .catch( () => { console.log('catcheeed') })
        .subscribe( res => {
          this.a = Article.fromPayload(res.articles[0]) || new Article();
          this.sections = this.a.sections.map( sec => Section.fromPayload(sec));
          this.articleService.currentArticle = this.a;
          this.createTutorialRepo(this.a);
        });
    } else {
      this.createTutorialRepo(this.a);
      this.sections = this.a.sections;
    }
  }
  createTutorialRepo(article){
    if( !article.repo ) {
      this.articleService.createRepo(article.id, article.title, article.deck).then(res => {
        this.articleService.currentArticle.repo = res.article.repo;
      }).catch(err => { });
    }
  }

  add(){
    this.sections.push( this.s );
    this.s = new Section();
  }
  remove( sec ) { console.log(sec);
    if( sec.id ) {
      this.articleService.removeSection( this.a.id, sec.id )
        .then( res => {
          this.sections = this.sections.filter( s => s.id !== sec.id );
        })
    } else {
      this.sections = this.sections.filter( s => s.time !== sec.time );
    }
  }

  createTutorialSections(){
    var newSections = this.sections.filter( sec => !sec.id );
    var updateSections = this.sections.filter(sec => sec.id );

    if( newSections.length ) {
      this.articleService.createSections( this.a.id, newSections.map( sec => { return {heading: sec.heading}; }) )
        .then( res => {})
    }

    if( updateSections.length ) {
      this.articleService.updateSections( this.a.id, updateSections.map( sec => { return {id: sec.id, heading: sec.heading}; }) )
        .then( res => {})
    }
  }
}