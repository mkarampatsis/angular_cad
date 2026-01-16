import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsModal } from './sections-modal';

describe('SectionsModal', () => {
  let component: SectionsModal;
  let fixture: ComponentFixture<SectionsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
