import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsModal } from './elements-modal';

describe('ElementsModal', () => {
  let component: ElementsModal;
  let fixture: ComponentFixture<ElementsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
