import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        provideMockStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(MockStore)?.resetSelectors();
  });

  function updateForm(userEmail: string, userPassword: string): void {
    component.authForm.controls['email'].setValue(userEmail);
    component.authForm.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form value should update from form changes', fakeAsync(() => {
    const validUser = {
      email: 'test@mail.ru',
      password: '123qweASD!',
    };
    updateForm(validUser.email, validUser.password);
    expect(component.authForm.value).toEqual(validUser);
  }));

  it('isValid should be false when form is invalid', fakeAsync(() => {
    const invalidUser = {
      email: 'test',
      password: '12345678',
    };
    updateForm(invalidUser.email, invalidUser.password);
    expect(component.authForm.valid).toBeFalsy();
  }));

  it('onLogin should dispatch login action', fakeAsync(() => {
    const store = TestBed.inject(MockStore);
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
    component.onSignIn();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  }));
});
