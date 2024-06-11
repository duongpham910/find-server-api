import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { findServer } from '../../services';

const mock = new MockAdapter(axios);

const responseV1 = [
  {
    url: "https://does-not-work.perfume.new",
    responseCode: 500,
  },
  {
    url: "https://gitlab.com",
    responseCode: 200,
  },
  {
    url: "http://app.scnt.me",
    responseCode: 200,
  },
  {
    url: "https://offline.scentronix.com",
    responseCode: 404,
  },
];

describe('findServer with responseV1', () => {
  beforeEach(() => {
    for (let i = 0; i < responseV1.length; i++) {
      mock.onGet(responseV1[i].url).reply(responseV1[i].responseCode);
    }
  });

  afterEach(() => {
    mock.reset();
  });
  
  it('should return an online server with the lowest priority', async () => {
    const response =  await findServer();

    expect(response).toBe('http://app.scnt.me');
  });
})

const responseV2 = [
  {
    url: "https://does-not-work.perfume.new",
    responseCode: 404,
  },
  {
    url: "https://gitlab.com",
    responseCode: 404,
  },
  {
    url: "http://app.scnt.me",
    responseCode: 404,
  },
  {
    url: "https://offline.scentronix.com",
    responseCode: 404,
  },
];

describe('findServer with responseV2', () => {
  beforeEach(() => {
    for (let i = 0; i < responseV2.length; i++) {
      mock.onGet(responseV2[i].url).reply(responseV2[i].responseCode);
    }
  });

  afterEach(() => {
    mock.reset();
  });
  
  it('should return no servers are online', async () => {
    const response =  await findServer();

    expect(response).toBe('failed');
  });
})
