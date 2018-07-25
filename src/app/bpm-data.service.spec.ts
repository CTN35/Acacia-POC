import { TestBed, inject } from '@angular/core/testing';

import { BpmDataService } from './bpm-data.service';

describe('BpmDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BpmDataService]
    });
  });

  it('should be created', inject([BpmDataService], (service: BpmDataService) => {
    expect(service).toBeTruthy();
  }));
});
