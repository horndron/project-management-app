import { TestBed } from '@angular/core/testing';

import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressService);
  });

  it('show should change dataLoading value in true', (done: DoneFn) => {
    service.show();
    service.dataLoading$.subscribe((data) => {
      expect(data).toBeTrue();
      done();
    });
  });

  it('hide should change dataLoading value in false', (done: DoneFn) => {
    service.hide();
    service.dataLoading$.subscribe((data) => {
      expect(data).toBeFalse();
      done();
    });
  });
});
