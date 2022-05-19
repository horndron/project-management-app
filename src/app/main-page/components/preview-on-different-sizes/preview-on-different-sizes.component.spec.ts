import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOnDifferentSizesComponent } from './preview-on-different-sizes.component';

describe('PreviewOnDifferentSizesComponent', () => {
  let component: PreviewOnDifferentSizesComponent;
  let fixture: ComponentFixture<PreviewOnDifferentSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewOnDifferentSizesComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewOnDifferentSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
