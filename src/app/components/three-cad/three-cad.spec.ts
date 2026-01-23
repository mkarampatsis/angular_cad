import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCad } from './three-cad';

describe('ThreeCad', () => {
  let component: ThreeCad;
  let fixture: ComponentFixture<ThreeCad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeCad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeCad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
