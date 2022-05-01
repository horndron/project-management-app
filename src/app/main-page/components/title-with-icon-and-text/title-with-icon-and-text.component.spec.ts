import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleWithIconAndTextComponent } from './title-with-icon-and-text.component';

describe('TitleWithIconAndTextComponent', () => {
  let component: TitleWithIconAndTextComponent;
  let fixture: ComponentFixture<TitleWithIconAndTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleWithIconAndTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleWithIconAndTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
