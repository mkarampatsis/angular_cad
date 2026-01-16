import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelModal } from './model-modal';

describe('ModelModal', () => {
  let component: ModelModal;
  let fixture: ComponentFixture<ModelModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
