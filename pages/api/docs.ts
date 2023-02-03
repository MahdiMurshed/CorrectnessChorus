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
      const { userId } = req.query as { userId: string };
      console.log({ userId: req.query });
      const docs = await prisma.document.findMany({
        where: {
          userId,
        },
      });
      return res.status(200).json({ docs });
    }
    case METHODS.POST: {
      const { message, answer, userId } = req.body;
      // const url = `http://127.0.0.1:5000/members?text="${message}"`;

      // const response = await axios.post(url);
      const doc = await prisma.document.create({
        data: {
          text: message,
          answer,
          userId,
        },
      });
      return res.status(201).json({ doc });
    }
    default:
      return res.status(500).json('not supported');
  }
}
