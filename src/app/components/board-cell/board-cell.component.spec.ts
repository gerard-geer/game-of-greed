import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCellComponent } from './board-cell.component';

describe('BoardCellComponent', () => {
  let component: BoardCellComponent;
  let fixture: ComponentFixture<BoardCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardCellComponent]
    });
    fixture = TestBed.createComponent(BoardCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
