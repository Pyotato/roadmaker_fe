import { apiRoutes, IS_PROD } from '@/constants';
import { consoleLog } from '@/utils/shared/console-log';

import { pick } from '.';

export const getApiResponse = async <T>({
  apiEndpoint,
  requestData,
  method = 'GET',
  revalidate = IS_PROD ? 3600 : 120, // cache data in seconds
  headers,
}: {
  apiEndpoint: string;
  requestData?: BodyInit;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  revalidate?: number;
  headers?: HeadersInit;
}) => {
  try {
    const startTime = Date.now();
    const response = await fetch(apiEndpoint, {
      method,
      body: requestData,
      headers,
      next: {
        revalidate,
      },
    });

    if (response.url === `${apiRoutes.signup}`) {
      if (response.status === 201) {
        return {
          message: `${JSON.parse(`${requestData}`)?.nickname}님 반갑습니다.`,
          httpStatus: response.status,
        };
      }
      if (response.status === 409) {
        return response.json();
      }
    }

    if (response.status === 404) {
      return { ...pick(await response.json(), 'error') };
    }

    if (response.status === 401) {
      return response.json();
    }

    if (!response.ok) {
      consoleLog('🚀 Debug getApiResponse requestData:', requestData);

      throw new Error(
        `😢 getApiResponse failed: ${response.status}/${response.statusText} - ${apiEndpoint}`,
      );
    }
    const duration = Date.now() - startTime;

    consoleLog(
      `getApiResponse: ${(duration / 1000).toFixed(2)}s ${
        duration > 2000 ? '💔' : '-'
      } ${apiEndpoint}`,
    );

    return (await response.json()) as T;
  } catch (error) {
    consoleLog('getApiResponse error:', error);
  }

  return null;
};
