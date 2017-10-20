import { Component } from '@angular/core';

import template from './milestone-panel.template.html';
import style from './milestone-panel.style.scss';

@Component({
  selector: 'milestone-panel',
  template,
  styles: [style],
  inputs: ['active', 'id']
})

export class MilestonePanelComponent {


}