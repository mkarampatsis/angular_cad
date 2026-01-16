import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsModal } from './materials-modal';

describe('MaterialsModal', () => {
  let component: MaterialsModal;
  let fixture: ComponentFixture<MaterialsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
