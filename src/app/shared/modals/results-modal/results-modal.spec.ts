import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsModal } from './results-modal';

describe('ResultsModal', () => {
  let component: ResultsModal;
  let fixture: ComponentFixture<ResultsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
