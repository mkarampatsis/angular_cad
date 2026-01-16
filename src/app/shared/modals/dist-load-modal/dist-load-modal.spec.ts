import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistLoadModal } from './dist-load-modal';

describe('DistLoadModal', () => {
  let component: DistLoadModal;
  let fixture: ComponentFixture<DistLoadModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistLoadModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistLoadModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
