import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';

const OPEN_AI_MODEL = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.3;

@Injectable()
export class OpenAIService {
  private readonly openAIApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  public async getModelAnswer(
    free_time: string,
    favorite_sports: string,
    physical_activity: string,
    wishes: string,
    disease: string,
    age: string,
    gender: string,
    accessible_sports: string,
    temperature?: number,
  ) {
    try {
      const params: CreateCompletionRequest = {
        prompt: `
          "Добрый день! Я могу помочь вам выбрать индивидуально вид спорта, который подойдет именно вам.
          Ответьте на несколько вопросов:

          1) Что Вам нравится делать в свободное время?
          ${free_time}

          2) Какие Ваши любимые виды спорта
          ${favorite_sports}

          3) Какой уровень физической активности Вам комфортен?
          ${physical_activity}

          4) Что Вы бы хотели достичь благодаря спорту?
          ${wishes}

          5) Имеются ли у Вас медицинские ограничения по здоровью?
          ${disease}

          6) Какой Ваш возраст?
          ${age}

          7) Какой Ваш пол?
          ${gender}

          Отвечайте как можно подробнее, и я порекомендую несколько подходящих видов спорта для вас.
          На основе ваших ответов, я могу порекомендовать наиболее подходящими для вас
          пять видов спорта из списка следующих видов спорта: ${accessible_sports}

          Ответ дай в следующем виде:
          1) Первый вид спорта,
          2) Второй вид спорта,
          3) Третий вид спорта,
          4) Четвертый вид спорта,
          5) Пятый вид спорта,
        `,

        model: OPEN_AI_MODEL,
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
        // 0.9
        max_tokens: 256,
        // 2048
      };

      const response = await this.openAIApi.createCompletion(params);

      // return response.data?.choices[0]?.text;
      return response.data;
    } catch (error) {}
  }
}
