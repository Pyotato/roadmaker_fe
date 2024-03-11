'use client';

import { Textarea } from '@mantine/core';
import { FormEvent, useCallback } from 'react';
import { Handle, Node, Position } from 'reactflow';
import styled from 'styled-components';

function TextUpdaterNode({ data }: Readonly<{ data: Node['data'] }>) {
  const onChange = useCallback(
    (evt: FormEvent<HTMLTextAreaElement>) => {
      data.label = evt?.currentTarget?.value;
    },
    [data],
  );

  return (
    <Wrap className='text-updater-node' style={{ height: 'fit-content' }}>
      <Handle
        type='target'
        position={Position.Right}
        isConnectable={true}
        id={Position.Right}
      />
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={true}
        id={Position.Top}
      />
      <Handle
        type='target'
        position={Position.Left}
        id={Position.Left}
        // style={handleStyle}
        isConnectable={true}
      />
      <Handle
        type='target'
        position={Position.Bottom}
        id={Position.Bottom}
        isConnectable={true}
      />
      <div className='label-wrap'>
        <Textarea
          id='text'
          name='text'
          autosize
          onChange={onChange}
          className='nodrag'
          placeholder='내용을 입력해주세요.'
        />
      </div>
      <Handle
        type='source'
        position={Position.Right}
        isConnectable={true}
        id={Position.Right}
      />
      <Handle
        type='source'
        position={Position.Top}
        isConnectable={true}
        id={Position.Top}
      />
      <Handle
        type='source'
        position={Position.Left}
        id={Position.Left}
        // style={handleStyle}
        isConnectable={true}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id={Position.Bottom}
        isConnectable={true}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: fit-content;

  & .label-wrap {
    width: fit-content;
    padding: 1rem;
  }
`;

export default TextUpdaterNode;
