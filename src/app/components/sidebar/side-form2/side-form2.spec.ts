import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideForm2 } from './side-form2';

describe('SideForm2', () => {
  let component: SideForm2;
  let fixture: ComponentFixture<SideForm2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideForm2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideForm2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
