import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { LoginResponseModel } from 'src/app/models/user';
import { UserHttpService } from './user-http.service';
import { UrlPath } from '../user.constants';

describe('UserHttpService', () => {
  const url = environment.baseUrl;
  const mockUser = {
    name: 'test',
    login: 'test@mail.ru',
    password: 'Userpass@123',
  };
  const mockResponse = {
    name: 'test',
    login: 'test@mail.ru',
    id: '1',
  };

  let service: UserHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllUsers and return an array of Users', (done: DoneFn) => {
    const mockUsersArray: LoginResponseModel[] = [mockResponse];

    service.getAllUsers().subscribe((res) => {
      expect(res).toEqual(mockUsersArray);
      done();
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${url + UrlPath.USERS}`,
    });

    req.flush(mockUsersArray);
  });

  it('should call createUser and the API should return the user that was created', (done: DoneFn) => {
    service.createUser(mockUser).subscribe((data) => {
      expect(data).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${url + UrlPath.SIGNUP}`,
    });

    req.flush(mockResponse);
  });

  it('should call editUser and the API should return the user that was edited', (done: DoneFn) => {
    const id = '1';

    service.editUser(id, mockUser).subscribe((data) => {
      expect(data).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne({
      method: 'PUT',
      url: `${url + UrlPath.USERS}/${id}`,
    });

    req.flush(mockResponse);
  });

  it('should call editUser and the API should return the user that was edited', (done: DoneFn) => {
    const tokenResponse = { token: '12345' };

    service.signIn(mockUser).subscribe((data) => {
      expect(data).toEqual(tokenResponse);
      done();
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${url + UrlPath.SIGNIN}`,
    });

    req.flush(tokenResponse);
  });
});
