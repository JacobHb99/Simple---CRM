import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavListComponent } from './mobile-nav-list.component';

describe('MobileNavListComponent', () => {
  let component: MobileNavListComponent;
  let fixture: ComponentFixture<MobileNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
