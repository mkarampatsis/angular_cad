import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideForm1 } from './side-form1';

describe('SideForm1', () => {
  let component: SideForm1;
  let fixture: ComponentFixture<SideForm1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideForm1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideForm1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
