// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import openai from '@lib/index';
import { shortLead } from '@lib/prompt';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${shortLead} ${message}`,
    max_tokens: 10,
    temperature: 0,
  });
  console.log({ response });

  return res.status(200).json({ text: response.data.choices[0].text });
}
