import { TestBed } from '@angular/core/testing';

import { HdfsFileService } from './hdfs-file.service';

describe('HdfsFileService', () => {
  let service: HdfsFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HdfsFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
