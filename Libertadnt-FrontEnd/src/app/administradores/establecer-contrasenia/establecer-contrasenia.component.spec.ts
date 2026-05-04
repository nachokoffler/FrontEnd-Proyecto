import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecerContraseniaComponent } from './establecer-contrasenia.component';

describe('EstablecerContraseniaComponent', () => {
  let component: EstablecerContraseniaComponent;
  let fixture: ComponentFixture<EstablecerContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablecerContraseniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablecerContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
