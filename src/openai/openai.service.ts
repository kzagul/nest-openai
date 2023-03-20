import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';

const OPEN_AI_MODEL = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;

@Injectable()
export class OpenAIService {
  private readonly openAIApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  public async getModelAnswer(question: string, temperature?: number) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: OPEN_AI_MODEL,
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
      };

      const response = await this.openAIApi.createCompletion(params);

      return response.data;
    } catch (error) {}
  }
}
