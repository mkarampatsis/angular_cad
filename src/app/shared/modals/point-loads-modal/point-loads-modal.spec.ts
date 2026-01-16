import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointLoadsModal } from './point-loads-modal';

describe('PointLoadsModal', () => {
  let component: PointLoadsModal;
  let fixture: ComponentFixture<PointLoadsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointLoadsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointLoadsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
