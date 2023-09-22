import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreedPlayerComponent } from './greed-player.component';

describe('GreedPlayerComponent', () => {
  let component: GreedPlayerComponent;
  let fixture: ComponentFixture<GreedPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreedPlayerComponent]
    });
    fixture = TestBed.createComponent(GreedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
