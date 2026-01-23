import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanCad } from './than-cad';

describe('ThanCad', () => {
  let component: ThanCad;
  let fixture: ComponentFixture<ThanCad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanCad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanCad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
