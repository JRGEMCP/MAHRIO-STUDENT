import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService, SectionService } from 'mahrio-header/src/services';
import { Article, Section } from 'mahrio-header/src/models';
import { TopNavService } from '../../services';

import template from './design-my-tutorial.template.html';
import style from './design-my-tutorial.style.scss';

@Component({
  selector: 'design-my-tutorial',
  template,
  styles: [style]
})

export class DesignMyTutorialComponent {
  static get parameters(){
    return [ActivatedRoute, Router, ArticleService, SectionService, TopNavService];
  }
  constructor( route, router, articleService, sectionService, topNavService ){
    this.route = route;
    this.router = router;
    this.articleService = articleService;
    this.sectionsService = sectionService;
    this.navService = topNavService;
    this.a = {};
    this.markdown = '';
    this.currentId = null;
    this.sections = [];
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
          this.sections = this.a.sections.map( sec => Section.fromPayload(sec));
          this.articleService.currentArticle = this.a;
          this.createSectionFile( this.sections );
        });
    } else {
      this.sections = this.a.sections;
      this.createSectionFile( this.sections );
    }

    this.navService.section
      .subscribe( section => {
        console.log( section );
        this.sections.find(sec => sec.id == this.currentId).body = this.markdown;
        this.markdown = this.sections.find( sec => sec.id == section ).body;
        this.currentId = section;
        console.log('sections', this.sections);
    });

    this.navService.save
      .subscribe( save => {
        if( save ) {
          this.sections.find(sec => sec.id == this.currentId).body = this.markdown;
          this.articleService.saveSections( this.route.params.value.id, this.sections )
            .then( res => {
              this.a.state = 'DEVELOPING';
            })
        }
    })
  }
  createSectionFile( sections ){
    if( sections.length ) {
      this.currentId = sections[0].id;
      this.markdown = sections[ 0 ].body;

      this.navService.sections = sections;
      let sec = sections.filter( sec => !sec.url);
      if( sec.length ){
        this.articleService.createSectionFiles( this.a.id, sec.map(s => { return {id: s.id, heading: s.heading}; }) )
          .then(res => {});
      }
    }
  }
}