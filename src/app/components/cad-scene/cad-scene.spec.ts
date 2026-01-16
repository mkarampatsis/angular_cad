import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadScene } from './cad-scene';

describe('CadScene', () => {
  let component: CadScene;
  let fixture: ComponentFixture<CadScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadScene]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadScene);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
