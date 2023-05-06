import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { getAIModelAnswer } from './model/openai';

@Controller('/message')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post()
  getModelAnswer(@Body() data: getAIModelAnswer) {
    return this.openAIService.getModelAnswer(
      data.question,
      data.favorite_sports,
      data.disease,
      data.accessibleSports,
    );
  }
}
