import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordValidator } from '../../validators/password.validator';

import { PasswordComponent } from './password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    component.authForm = new FormGroup({
      password: new FormControl('', [Validators.required, PasswordValidator.check]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getter password should return password control', () => {
    const control = component.authForm.controls['password'];
    expect(control).toBeTruthy();
  });

  it('shouldn\'t be empty', () => {
    expect(component.authForm.valid).toEqual(false);
  });

  it('should require valid password', () => {
    component.authForm.setValue({
      password: '12345678',
    });
    expect(component.authForm.valid).toEqual(false);
  });

  it('should be valid if form value is valid', () => {
    component.authForm.setValue({
      password: '123qweASD!',
    });
    expect(component.authForm.valid).toEqual(true);
  });
});
