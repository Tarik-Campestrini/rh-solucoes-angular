import { TestBed } from '@angular/core/testing';

import { VagaResolverGuard } from './vaga-resolver.guard';

describe('VagaResolverGuard', () => {
  let guard: VagaResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VagaResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
