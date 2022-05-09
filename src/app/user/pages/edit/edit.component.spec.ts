import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
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
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(MockStore)?.resetSelectors();
  });

  function updateForm(userName: string, userEmail: string, userPassword: string): void {
    component.authForm.controls['name'].setValue(userName);
    component.authForm.controls['email'].setValue(userEmail);
    component.authForm.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form value should update from form changes', fakeAsync(() => {
    const validUser = {
      name: 'test',
      email: 'test@mail.ru',
      password: '123qweASD!',
    };
    updateForm(validUser.name, validUser.email, validUser.password);
    expect(component.authForm.value).toEqual(validUser);
  }));

  it('isValid should be false when form is invalid', fakeAsync(() => {
    const invalidUser = {
      name: '',
      email: 'test',
      password: '12345678',
    };
    updateForm(invalidUser.name, invalidUser.email, invalidUser.password);
    expect(component.authForm.valid).toBeFalsy();
  }));

  it('onEditUser should dispatch edit action', fakeAsync(() => {
    const store = TestBed.inject(MockStore);
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
    component.onEditUser();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  }));
});
