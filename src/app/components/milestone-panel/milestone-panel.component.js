import { Component } from '@angular/core';

import template from './milestone-panel.template.html';
import style from './milestone-panel.style.scss';

@Component({
  selector: 'milestone-panel',
  template,
  styles: [style],
  inputs: ['active', 'id','state','n']
})

export class MilestonePanelComponent {
  constructor(){
    this.n = 1;
    this.state = 'DISCOVERING';
  }
  ngOnChanges(){ console.log(this.state);
    switch( this.state ){
      case 'DISCOVERING':
        this.n = 1;
        break;
      case 'DEFINING':
        this.n = 1;
        break;
      case 'DESIGNING':
        this.n = 2;
        break;
      case 'DEVELOPING':
        this.n = 3;
        break;
      case 'DEPLOYED':
        this.n = 4;
        break;
      default:
        this.n = 0;
    }
  }
}