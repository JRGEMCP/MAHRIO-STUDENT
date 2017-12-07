import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import template from './tostado.template.html';

@Component({
  selector: 'tostado',
  template
})

export class TostadoComponent {
  static get parameters(){
    return [ToastsManager, ViewContainerRef];
  }
  constructor( toast, vc ){
    this.toast = toast;
    this.toast.setRootViewContainerRef(vc);
  }

  ngOnInit(){
    this.toast.success('Loaded From Server<i class="fa fa-check"></i>', 'Success!', {showCloseButton: true, enableHTML: true, dismiss: 'controlled'});
  }
}