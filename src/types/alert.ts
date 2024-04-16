import { FAIL, SUCCESS, WARNING } from '@/constants';

export type Warning = typeof WARNING;
export type WarningKeys = keyof Warning;

export type Success = typeof SUCCESS;
export type SuccessKeys = keyof Success;

export type Fail = typeof FAIL;
export type FailKeys = keyof Fail;
