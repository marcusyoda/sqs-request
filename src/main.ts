import AWS from 'aws-sdk';
import {Squiss} from 'squiss-ts';
import {Print} from 'ts-print';
import {ProcessEnv} from './index.ds';
import {ISquissOptions} from 'squiss-ts/dist/Types';
import {onMessage} from './onMessage';
import {GetObjectOutput} from 'aws-sdk/clients/s3';

const {
  AWS_ENDPOINT = '',
  AWS_ACCESS_KEY_ID = '',
  AWS_SECRET_ACCESS_KEY = '',
  SQUISS_BODY_FORMAT = 'json',
  SQS_REGION = '',
  QUEUE_NAME = '',
  MAX_IN_FLIGHT = '100',
  BATCH_SIZE = '10',
  POOL_INTERVAL_MS = '0',
}: ProcessEnv = process.env;

const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: SQS_REGION,
};

if (AWS_ENDPOINT !== '') {
  awsConfig.endpoint = new AWS.Endpoint(AWS_ENDPOINT);
  AWS.config.update(awsConfig);
}

const SquissOptions: ISquissOptions = {
  awsConfig,
  queueName: QUEUE_NAME,
  maxInFlight: +MAX_IN_FLIGHT,
  receiveBatchSize: +BATCH_SIZE,
  activePollIntervalMs: +POOL_INTERVAL_MS,
};

const bodyFormat: string = SQUISS_BODY_FORMAT;
if (bodyFormat === 'json' || bodyFormat === 'plain') {
  SquissOptions.bodyFormat = bodyFormat;
}

const poller = new Squiss(SquissOptions);

poller.start()
  .catch((err: any) => {
    Print(`POLLER-START - ${err.message}, Falha iniciando pooler.`).err();
  });

poller.on('message', async (msg) => {
  const req = msg.body;
  if (req.s3Request) {
  } else {
    const Bucket = req?.s3Request?.bucket;
    const Key = req?.s3Request?.key;
    if (Bucket && Key) {
      const s3 = new AWS.S3();
      s3.getObject({
        Bucket,
        Key,
      }, (err, data: GetObjectOutput) => {
        if (err) {
          Print(`S3-REQUEST-GET ${err.message}`).err();
        } else {
          const jsonString: string = data.Body ? data.Body.toString('utf-8') : '';
          msg.body = {
            data: JSON.parse(jsonString),
            headers: req.headers,
            path: req.path,
          };
          onMessage(msg);
          s3.deleteObject({
            Bucket,
            Key,
          }, (errDeleteS3) => {
            if (errDeleteS3) {
              Print(`S3-REQUEST-DELETE ${errDeleteS3.message}`).err();
            }
          });
        }
      });
    }
  }
});
