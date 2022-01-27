import axios, {AxiosError, AxiosResponse} from 'axios';
import {Print} from 'ts-print';
import {IOptions, ProcessEnv} from './index.ds';

const {
  API_URL = '',
  DATA_TYPE_POST = 'json',
  PRINT_HEADERS = '',
  PRINT_RESPONSE = '',
}: ProcessEnv = process.env;

export const onMessage = async (msg: any) => {
  const req = msg.body;

  let url = req.url || API_URL;
  if (req.path) url = `${url}${req.path}`;

  const options: IOptions = {
    method: (req.method || 'POST').toUpperCase(),
    dataType: DATA_TYPE_POST,
  };

  if (req.data) {
    options.data = req.data;
  }

  if (req.headers) {
    options.headers = req.headers;
  }

  await axios(url, options).then((response: AxiosResponse<any>) => {
    if (!response) {
      Print(`REQUEST Não retornou resposta, Falha ao identificar a razão'}`).err();
      msg.keep();
      return;
    }

    const reasonPhrase: string = response && response?.data?.reason_phrase || '-';
    const statusCode: number = response.status;

    const successCode: boolean = statusCode >= 200 && statusCode <= 299;
    const clientError: boolean = statusCode >= 400 && statusCode <= 499;

    if (successCode || clientError) {
      Print(`REQUEST - ${reasonPhrase} / REMOVENDO a mensagem, o Request FOI processado com sucesso`).ok();
      if (PRINT_HEADERS) {
        // eslint-disable-next-line no-console
        console.log('RESPONSE-HEADERS', response.headers);
      }

      if (PRINT_RESPONSE) {
        // eslint-disable-next-line no-console
        console.log('RESPONSE-DATA', response.data);
      }

      msg.del();
    } else {
      Print(`REQUEST - ${reasonPhrase} / MANTENDO a mensagem, o Request NÃO foi processado`).warn();
      msg.keep();
    }
  }).catch((err: AxiosError) => {
    Print(err.message || 'Falha ao identificar a razão [AXIOS-CATCH].').err();
    msg.keep();
  });
};
