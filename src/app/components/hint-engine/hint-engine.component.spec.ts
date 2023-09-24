import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintEngineComponent } from './hint-engine.component';

describe('HintEngineComponent', () => {
  let component: HintEngineComponent;
  let fixture: ComponentFixture<HintEngineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HintEngineComponent]
    });
    fixture = TestBed.createComponent(HintEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
