import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { catsMobule } from '../src/modules/cats/cats.module';
import { CatsService } from '../src/modules/cats/cats.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let catsService = { findAll: () => [] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [catsMobule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});