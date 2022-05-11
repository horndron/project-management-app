import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import * as UserActions from '../../store/user.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let storeSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [TranslateModule.forRoot()],
      providers: [FormBuilder, provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    storeSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  function updateForm(userEmail: string, userPassword: string): void {
    component.authForm.controls['email'].setValue(userEmail);
    component.authForm.controls['password'].setValue(userPassword);
  }

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
    const mockUser = {
      login: 'test@mail.ru',
      password: '123qweASD!',
    };

    component.authForm.setValue({
      email: mockUser.login,
      password: mockUser.password,
    });
    component.onSignIn();

    expect(storeSpy).toHaveBeenCalledWith(
      UserActions.LoginUser({ user: mockUser }),
    );
  }));
});
