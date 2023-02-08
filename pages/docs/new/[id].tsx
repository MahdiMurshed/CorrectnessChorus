import { useSession } from '@hooks/useUser';
import axios from '@lib/axios';
import { Button, Text, Textarea } from '@mantine/core';
import { Document } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useReducer, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { initialState, reducer } from '~popup';

const NewDocument = () => {
  //complete the function which takes input from text area and sends it to the backend
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, ans, loading } = state;
  const [session] = useSession();
  const queryClient = useQueryClient();
  console.log({ session });
  const userId = session?.user?.id;

  useEffect(() => {
    if (ans !== '') {
      addTodoMutation.mutate({ data, ans, userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ans, session?.user?.id]);

  const addTodoMutation = useMutation({
    mutationFn: (newText) =>
      axios.post('/docs', {
        message: newText.data,
        answer: newText.ans,
        userId: newText.userId,
      }),
    // When mutate is called:
    onMutate: async (newTodo: any) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['docs', userId],
      });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Document[]>([
        'docs',
        userId,
      ]);

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData<Document[]>(
          ['docs', userId],
          [
            ...previousTodos,
            {
              text: newTodo.data,
              answer: newTodo.ans,
              userId: newTodo.userId,
              id: Math.random().toString(),
              createdAt: new Date(),
            },
          ]
        );
      }

      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Document[]>(
          ['docs', userId],
          context.previousTodos
        );
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['docs', userId] });
    },
  });

  const handleSubmit = async (e: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    e.preventDefault();

    try {
      const url = `http://127.0.0.1:5000/members?text=${data}`;
      console.log({ url });
      const response = await axios.post(url);
      console.log({ response });
      let answer = '';
      response.data.map((dt) => (answer += dt.text));

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
          {ans.replace(/['"]/g, '')}
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
