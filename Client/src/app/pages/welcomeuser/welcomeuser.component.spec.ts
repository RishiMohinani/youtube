import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeuserComponent } from './welcomeuser.component';

describe('WelcomeuserComponent', () => {
  let component: WelcomeuserComponent;
  let fixture: ComponentFixture<WelcomeuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeuserComponent]
    });
    fixture = TestBed.createComponent(WelcomeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
