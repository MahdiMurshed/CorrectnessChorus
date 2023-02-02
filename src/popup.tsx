import { Tooltip } from '@components/tooltip';
import axios from '@lib/axios';
import { Button, Text, Textarea } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy } from '@tabler/icons';
import React, { useReducer } from 'react';
import { toast } from 'react-toastify';

type ACTIONTYPE =
  | { type: 'SET_DATA'; payload: string }
  | { type: 'SET_ANS'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState = {
  data: '',
  ans: '',
  loading: false,
};

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_ANS':
      return { ...state, ans: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

function IndexPopup() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, ans, loading } = state;
  const clipboard = useClipboard({ timeout: 1000 });

  const handleSubmit = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const url = `/members?text=${data}`;
      console.log({ url });
      const response = await axios.post(url);
      const answer = response.data.text;
      dispatch({ type: 'SET_ANS', payload: answer });
      toast.success('Got correction');
    } catch (error) {
      console.log({ error });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        height: 'auto',
        width: '400px',
        borderRadius: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#F7F7F7',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Paste a sentence
      </h2>
      <Textarea
        style={{
          padding: '0.5rem',
          borderRadius: '15px',
          border: 'none',
          width: '100%',
          marginBottom: '1rem',
        }}
        minRows={1}
        maxRows={5}
        onChange={(e) =>
          dispatch({ type: 'SET_DATA', payload: e.target.value })
        }
        value={data}
        placeholder="Enter a sentence"
      />

      <Button
        variant="filled"
        color="pink"
        fullWidth
        loaderProps={{ color: 'white' }}
        loading={loading}
        onClick={handleSubmit}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '5px',
        }}
      >
        Submit
      </Button>

      {ans !== '' && (
        <>
          <Text color="pink" size="xl" pt={10}>
            Correct sentence
          </Text>
          <div
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              fontSize: '1.2rem',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Text>{ans}</Text>
            <Tooltip
              label={clipboard.copied ? 'Copied ✔' : 'Copy'}
              color={clipboard.copied ? 'teal' : 'pink'}
            >
              <IconCopy
                style={{
                  cursor: 'pointer',
                }}
                color={clipboard.copied ? 'teal' : 'pink'}
                onClick={() => clipboard.copy(ans)}
              />
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}

export default IndexPopup;
