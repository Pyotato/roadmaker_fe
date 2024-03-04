'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash.debounce';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { z } from 'zod';

import { consoleLog } from '@/utils/shared/console-log';
import { getApiResponse } from '@/utils/shared/get-api-response';

const zodSchema = z.object({
  name: z.string().min(5, { message: 'Name is required' }),
  email: z.string().min(10).email({ message: 'Invalid email address' }),
});

type FormValues = z.infer<typeof zodSchema>;

const ReactHookForm: React.FC = () => {
  const apiEndpoint = '/api/test';
  const [apiResult, setApiResult] = React.useState<FormValues>();

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await getApiResponse<{
        reqData: FormValues;
      }>({
        apiEndpoint,
        method: 'POST',
        requestData: JSON.stringify(data),
      });
      setApiResult(result?.reqData);
      consoleLog('getApiResponse result', result, errors);
    } catch (error) {
      consoleLog('handleSubmit ERROR', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <FormLabel>
        Name:
        <Controller
          name='name'
          control={control}
          // onChange={debounce(() => trigger())}
          defaultValue=''
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <div>{errors.name.message}</div>}
      </FormLabel> */}

      <FormLabel>
        Email:
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => <input {...field} />}
        />
        {errors.email && <div>{errors.email.message}</div>}
      </FormLabel>

      <FormLabel>
        Name:
        <Controller
          control={control}
          name='name'
          render={({ field: { onBlur, value, ref } }) => (
            <input
              onChange={debounce(async () => {
                await trigger('name');
              }, 500)} // send value to hook form
              onBlur={onBlur} // notify when input is touched
              value={value} // return updated value
              ref={ref} // set ref for focus management
            />
          )}
        />
        {errors.name && <div>{errors.name.message}</div>}
      </FormLabel>
      {apiResult && (
        <div>
          API result from {apiEndpoint}: {apiResult.name} & {apiResult.email}
        </div>
      )}
      <button type='submit'>Test react hook form with zod</button>
    </form>
  );
};

export default ReactHookForm;

const FormLabel = styled.label`
  text-align: center;
`;
