import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportsModal } from './supports-modal';

describe('SupportsModal', () => {
  let component: SupportsModal;
  let fixture: ComponentFixture<SupportsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
