import { Button, Text, Textarea } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from '@lib/axios';
import { toast } from 'react-toastify';

const NewDocument = () => {
  //complete the function which takes input from text area and sends it to the backend
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setAnswer('');
    setLoading(true);
    e.preventDefault();
    const id = toast.loading('Getting corrections');
    console.log(text);
    try {
      const response = await axios.post(`/grammar`, {
        message: text,
      });
      const answer = response.data.text;
      setAnswer(answer);
      toast.success('Got correction');
    } catch (error) {
      toast.error('Request failed');
    }
    setLoading(false);
    toast.dismiss(id);
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
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
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
          {answer}
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
