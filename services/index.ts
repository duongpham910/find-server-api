import axios from "axios";
import { onlineServerProps } from '../interfaces';

const arr = [
  {
    url: "https://does-not-work.perfume.new",
    priority: 1,
  },
  {
    url: "https://gitlab.com",
    priority: 4,
  },
  {
    url: "http://app.scnt.me",
    priority: 3,
  },
  {
    url: "https://offline.scentronix.com",
    priority: 2,
  },
];

export async function findServer():  Promise<string> {
  let onlineServer: onlineServerProps[] = [];

  const promises = arr.map(server =>
    axios({
      method: 'get',
      url: server.url,
      timeout: 5000,
    }).then(response => ({
      url: server.url,
      priority: server.priority,
      status: response.status,
    }))
    .catch(error => ({
      url: server.url,
      priority: server.priority,
      status: false
    }))
  );

  const results = await Promise.all(promises);

  results.forEach(result => {
    if (result.status) onlineServer.push({
      url: result.url,
      priority: result.priority
    }) 
  });

  if (onlineServer.length == 0) return 'failed'

  onlineServer.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return a.priority > b.priority ? 1 : 0;
  });

  return onlineServer[0].url
};
