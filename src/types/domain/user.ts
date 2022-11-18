interface BaseInfo {
  account: string;
  password: string;
}

export interface UserInfo extends BaseInfo {
  id: string;
}

export interface LoginInfo {
  account: string;
  password: string;
}

export interface RegisterInfo {
  avatar: string;
  name: string;
  account: string;
  password: string;
  passwordAgain: string;
}

export interface AdministratorInfo extends BaseInfo {
  id: string;
  name: string;
  avatar: string;
  canteenId: string;
  canteenName: string;
}

export interface EmployeeInfo {
  id: string;
  name: string;
  phone: string;
  sex: string;
  idNumber: string;
  canteenId: string;
}
