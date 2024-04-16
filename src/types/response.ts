import { FailKeys } from './alert';

export interface ErrorResponse {
  httpStatus: FailKeys;
  message: string;
  errorCode: string;
}
