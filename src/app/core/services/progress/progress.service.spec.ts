import { TestBed } from '@angular/core/testing';

import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('show should change dataLoading value in true', () => {
    service.show();
    service.dataLoading$.subscribe((data) => {
      expect(data).toBeTrue();
    });
  });

  it('hide should change dataLoading value in false', () => {
    service.hide();
    service.dataLoading$.subscribe((data) => {
      expect(data).toBeFalse();
    });
  });
});
