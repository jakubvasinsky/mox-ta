import pactum from 'pactum';

const { request, response, settings, handler } = pactum;
const { addCaptureHandler } = handler;

export function pactumBaseApiSetup() {
  settings.setLogLevel('TRACE');

  request.setDefaultTimeout(30 * 1000);
  request.setDefaultHeaders({
    'user-agent': 'pactumJS',
  });
  response.setDefaultExpectResponseTime(30 * 1000);
  process.env.PASSWORD = 'secret_sauce';
  process.env.API_KEY = 'reqres-free-v1';
  setPactumCaptureHandler();
}

export function setPactumCaptureHandler() {
  addCaptureHandler('ParseResponse', (ctx: { req: any; res: any }) => {
    const req = ctx.req;
    const res = ctx.res;
    // console.log(ctx);
    return {
      requestContext: { Method: req.method, Url: req.url },
      request: req.body,
      responseContext: { Status: res.statusCode, StatusMessage: res.statusMessage },
      response: res.text && !res.rawHeaders.includes('image/jpeg') ? JSON.parse(res.text) : res.text,
    };
  });
}
