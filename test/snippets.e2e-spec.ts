import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { SnippetsModule } from '../src/snippets/snippets.module';
import prisma from './client';

describe('Snippets', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SnippetsModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    const deleteSnippets = prisma.snippet.deleteMany();

    await prisma.$transaction([deleteSnippets]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('/POST should create new snippet', async () => {
    const test = await request(app.getHttpServer())
      .post('/snippets')
      .send({ content: 'Test snippet post' })
      .set('Content-Type', 'application/json')
      .expect(201);

    expect(test.body).toHaveProperty('content', 'Test snippet post');
  });

  it('/GET should return all snippets', async () => {
    await prisma.snippet.createMany({
      data: [{ content: 'Test snippet 1' }, { content: 'Test snippet 2' }]
    });

    const test = await request(app.getHttpServer())
      .get('/snippets')
      .expect(200);

    expect(test.body).toHaveLength(2);
  });

  it('/GET:id should return snippet with given id', async () => {
    const createdSnippet = await request(app.getHttpServer())
      .post('/snippets')
      .send({ content: 'Test snippet' })
      .set('Content-Type', 'application/json')
      .expect(201);

    await request(app.getHttpServer())
      .get(`/snippets/${createdSnippet.body.id}`)
      .expect(200)
      .expect(createdSnippet.body);
  });
});
