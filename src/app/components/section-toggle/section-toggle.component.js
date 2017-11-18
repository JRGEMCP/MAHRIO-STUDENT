import { Component } from '@angular/core';
import { TopNavService } from '../../services';

import template from './section-toggle.template.html';
import style from './section-toggle.style.scss';

@Component({
  selector: 'section-toggle',
  template,
  styles: [ style ]
})

export class SectionToggleComponent {
  static get parameters(){
    return [TopNavService];
  }

  constructor(topNavService){
    this.navService = topNavService;
    this.sections = [];
    this.section = '';
  }
  ngOnInit(){
    this.navService.sections
      .subscribe( sections => {
        this.sections = sections;
      });
  }
  setSection( val ) { console.log( val );
    this.navService.section = val;
  }

  saveSections(){ console.log('here');
    this.navService.save = true;
  }
}

