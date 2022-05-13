import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardColunmComponent } from './board-colunm.component';

describe('BoardColunmComponent', () => {
  let component: BoardColunmComponent;
  let fixture: ComponentFixture<BoardColunmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardColunmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardColunmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
