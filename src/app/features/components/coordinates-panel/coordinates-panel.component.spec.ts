import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesPanelComponent } from './coordinates-panel.component';

describe('CoordinatesPanelComponent', () => {
  let component: CoordinatesPanelComponent;
  let fixture: ComponentFixture<CoordinatesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
