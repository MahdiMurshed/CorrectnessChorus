import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: 'org-jRJpW9elxD19RZHKnPkB9Nis',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default openai;
