import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { SnippetsModule } from '../src/snippets/snippets.module';
import prisma from './client';

describe('Snippets', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SnippetsModule, ScheduleModule.forRoot()]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
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

  it('/POST should create new snippet without password', async () => {
    const test = await request(app.getHttpServer())
      .post('/snippets')
      .send({ title: 'Test', content: 'Test snippet post' })
      .set('Content-Type', 'application/json')
      .expect(201);

    expect(test.body).toHaveProperty('content', 'Test snippet post');
  });

  it('/POST should create new snippet with password for correct request', async () => {
    const test = await request(app.getHttpServer())
      .post('/snippets')
      .send({
        title: 'Test',
        content: 'Test snippet with password',
        password: 'test_pw'
      })
      .set('Content-Type', 'application/json')
      .expect(201);

    expect(test.body).toHaveProperty('content', 'Test snippet with password');
  });

  it('/PATCH should update a snippet without password', async () => {
    const createdSnippet = await request(app.getHttpServer())
      .post('/snippets')
      .send({ title: 'Test', content: 'Test snippet' })
      .set('Content-Type', 'application/json')
      .expect(201);

    const updatedSnippet = await request(app.getHttpServer())
      .patch(`/snippets/${createdSnippet.body.id}`)
      .send({ title: 'Test', content: 'Updated snippet' })
      .set('Content-Type', 'application/json')
      .expect(200);

    expect(updatedSnippet.body).toHaveProperty('content', 'Updated snippet');
  });

  it('/GET should return all snippets', async () => {
    await request(app.getHttpServer())
      .post('/snippets')
      .send({ title: 'Test 1', content: 'Test snippet' })
      .set('Content-Type', 'application/json')
      .expect(201);

    await request(app.getHttpServer())
      .post('/snippets')
      .send({ title: 'Test 2', content: 'Test snippet' })
      .set('Content-Type', 'application/json')
      .expect(201);

    const test = await request(app.getHttpServer())
      .get('/snippets')
      .expect(200);

    expect(test.body).toHaveLength(2);
  });

  it('/GET:id should return snippet with given id', async () => {
    const createdSnippet = await request(app.getHttpServer())
      .post('/snippets')
      .send({ title: 'Test', content: 'Test snippet' })
      .set('Content-Type', 'application/json')
      .expect(201);

    await request(app.getHttpServer())
      .get(`/snippets/${createdSnippet.body.id}`)
      .expect(200)
      .expect(createdSnippet.body);
  });
});
