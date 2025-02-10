import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserNotificationComponent } from './browser-notification.component';

describe('BrowserNotificationComponent', () => {
  let component: BrowserNotificationComponent;
  let fixture: ComponentFixture<BrowserNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
