import { HostListener, Injectable } from '@angular/core';
import { CanDeactivate } from "@angular/router";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {

    if(!component.canDeactivate()){
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}

export abstract class ComponentCanDeactivate {

  abstract canDeactivate(): boolean;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
   /* if (!this.canDeactivate()) {
      $event.returnValue =true;
    }*/
  }
}