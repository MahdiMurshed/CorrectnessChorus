import axios from '@lib/axios';
import { Button, Text, Textarea } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { initialState, reducer } from '~popup';

const NewDocument = () => {
  //complete the function which takes input from text area and sends it to the backend
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, ans, loading } = state;

  useEffect(() => {
    async function fetchData() {
      try {
        await axios.post('/save-doc', {
          message: data,
          answer: ans,
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ans]);

  const handleSubmit = async (e: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    e.preventDefault();

    try {
      const url = `http://127.0.0.1:5000/members?text="${data}"`;
      console.log({ url });
      const response = await axios.post(url);
      const answer = response.data.text;

      dispatch({ type: 'SET_ANS', payload: answer });
      toast.success('Got correction');
    } catch (error) {
      console.log({ error });
      toast.error('Request failed');
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: '2rem',
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            backgroundColor: '#e7f5ff',
            borderRadius: '1rem',
            padding: '1rem',
            marginRight: '1rem',
          }}
        >
          <Text size="xl">{`Document ${id}`}</Text>
        </div>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Your text"
            variant="filled"
            radius="xs"
            size="xl"
            value={data}
            onChange={(e) =>
              dispatch({ type: 'SET_DATA', payload: e.target.value })
            }
            minRows={15}
          />
          <Button
            type="submit"
            radius="md"
            size="lg"
            uppercase
            loading={loading}
            loaderPosition="right"
          >
            Submit
          </Button>
        </form>
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            backgroundColor: '#e7f5ff',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <Text size="xl">Suggestions</Text>
        </div>
        <div
          style={{
            fontSize: '2rem',
            padding: '2rem',
          }}
        >
          {ans}
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
