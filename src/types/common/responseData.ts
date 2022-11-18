import { AxiosResponse } from 'axios';
import { ErrorData } from './errorData';
import { UserInfo } from '@/types/domain/user';

export type StringResponse = Promise<AxiosResponse<string> | ErrorData>;

export type Token = { token: string };

export type TokenResponse = Promise<AxiosResponse<Token> | ErrorData>;

export type UserDataResponse = Promise<AxiosResponse<UserInfo> | ErrorData>;
