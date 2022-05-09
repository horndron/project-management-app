import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EmailComponent } from './email.component';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    component.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getter email should return email control', () => {
    const control = component.authForm.controls['email'];
    expect(control).toBeTruthy();
  });

  it('shouldn\'t be empty', () => {
    expect(component.authForm.valid).toEqual(false);
  });

  it('should require valid email', () => {
    component.authForm.setValue({
      email: 'invalidemail',
    });
    expect(component.authForm.valid).toEqual(false);
  });

  it('should be valid if form value is valid', () => {
    component.authForm.setValue({
      email: 'test@mail.ru',
    });
    expect(component.authForm.valid).toEqual(true);
  });
});
