import http from 'k6/http';
import { check, group } from 'k6';
import { mockAsset } from './helpers.js';

const BASE_URL = 'http://localhost:3000';

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    checks: ['rate>=0.995'],
    http_req_duration: ['avg<12000', 'p(95)<130000'],
    http_req_failed: ['rate<0.005'],
    http_reqs: ['rate>=0.8'],
  },
  noConnectionReuse: true,
};

export default function () {
  group('/v1/asset/upload medium files', () => {
    let url = BASE_URL + `/v1/asset/upload`;
    // Request No. 1: ApiController_assetUpload medium files
    {
      const data = mockAsset('md');
      // Send the PUT request
      const request = http.put(url, data);
      check(request, {
        '': (r) => r.status === 202,
      });
    }
  });
}
