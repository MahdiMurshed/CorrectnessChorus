import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.GET: {
      return res.status(200).json({});
    }
    case METHODS.POST: {
      const { message, answer } = req.body;
      // const url = `http://127.0.0.1:5000/members?text="${message}"`;

      // const response = await axios.post(url);
      const doc = await prisma.document.create({
        data: {
          text: message,
          answer,
        },
      });
      return res.status(201).json({ doc });
    }
    default:
      return res.status(500).json('not supported');
  }
}
