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
    question: string,
    favorite_sports: string,
    disease: string,
    accessibleSports: string,
    temperature?: number,
  ) {
    try {
      const params: CreateCompletionRequest = {
        // prompt: `Suggest only three types of sport for person.
        //   Basing that he/she has next favorite sports: ${favorite_sports}.
        //   Person has next disease: ${disease}
        //   suggest only from these sports: ${accessibleSports}`,
        prompt: `
        "Привет! Я могу помочь тебе выбрать индивидуальный вид спорта, который подойдет именно тебе. Ответь на несколько вопросов:

        1) Что тебе нравится делать в свободное время?
        ${favorite_sports}

        2) Какой уровень физической активности тебе комфортен?
        Я предпочитаю спокойные занятия в помещении, например, йогу или пилатес.

        3) Что ты бы хотел достичь благодаря спорту?
        Я хочу улучшить свою физическую форму и настроение.

        4) Имеются ли у тебя медицинские ограничения по здоровью?
        ${disease}

        5) Какой твой возраст?
        Мне 25 лет.

        6) Какой твой пол?
        Я мужчина.

        Отвечай как можно подробнее, и я порекомендую несколько подходящих видов спорта для тебя.
        На основе твоих ответов, я могу порекомендовать наиболее подходящими для тебя пять видов спорта из списка следующих видов спорта: ${accessibleSports}

        Ответ дай в следующем виде: 
        1) Первый вид спорта,  2) Второй вид спорта,  3) Третий вид спорта,  4) Четвертый вид спорта,  5) Пятый вид спорта, 
        `,

        model: OPEN_AI_MODEL,
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
        max_tokens: 256,
      };

      const response = await this.openAIApi.createCompletion(params);

      return response.data;
    } catch (error) {}
  }
}
