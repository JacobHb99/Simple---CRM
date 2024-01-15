import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {
  sideNavMode: MatDrawerMode = 'side';
  public mobileOn = new BehaviorSubject<boolean>(false);

  constructor(private breakpoints: BreakpointObserver) { }


  ngOnInit() {
  
    this.breakpoints.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetPortrait])
      .subscribe(result => {
    
        const breakpoints = result.breakpoints;
    
        if (breakpoints[Breakpoints.TabletPortrait]) {
          console.log("screens matches TabletPortrait");
        }
        else if (breakpoints[Breakpoints.HandsetPortrait]) {
          debugger;
          console.log("screens matches HandsetLandscape");
          this.sideNavMode = 'over';
          this.mobileOn.next(!this.mobileOn.value);
        }
    
      });
  }
}
