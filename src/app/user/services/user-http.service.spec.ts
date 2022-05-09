import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { UserHttpService } from './user-http.service';
import { LoginResponseModel } from '../models/user.models';

describe('UserHttpService', () => {
  let service: UserHttpService;
  let httpMock: HttpTestingController;
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

  it('should call getAllUsers and return an array of Users', () => {
    const mockUsersArray: LoginResponseModel[] = [mockResponse];

    service.getAllUsers().subscribe((res) => {
      expect(res).toEqual(mockUsersArray);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${url}users`,
    });

    req.flush(mockUsersArray);
  });

  it('should call createUser and the API should return the user that was created', () => {
    service.createUser(mockUser).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${url}signup`,
    });

    req.flush(mockResponse);
  });

  it('should call editUser and the API should return the user that was edited', () => {
    const id = '1';

    service.editUser(id, mockUser).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne({
      method: 'PUT',
      url: `${url}users/${id}`,
    });

    req.flush(mockResponse);
  });

  it('should call editUser and the API should return the user that was edited', () => {
    const tokenResponse = { token: '12345' };

    service.signIn(mockUser).subscribe((data) => {
      expect(data).toEqual(tokenResponse);
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${url}signin`,
    });

    req.flush(tokenResponse);
  });
});
