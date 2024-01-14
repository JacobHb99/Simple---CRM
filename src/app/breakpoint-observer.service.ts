import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  constructor(private breakpoints: BreakpointObserver) { }


  ngOnInit() {
  
    this.breakpoints.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetLandscape])
      .subscribe(result => {
    
        const breakpoints = result.breakpoints;
    
        if (breakpoints[Breakpoints.TabletPortrait]) {
          console.log("screens matches TabletPortrait");
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          console.log("screens matches HandsetLandscape");
        }
    
      });
  }
}
