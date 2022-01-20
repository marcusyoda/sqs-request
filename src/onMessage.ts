import axios, {AxiosError, AxiosResponse} from 'axios';
import {Print} from 'ts-print';
import {IOptions, ProcessEnv} from './index.ds';

const {
  API_URL = '',
  DATA_TYPE_POST = 'json',
  PRINT_RESPONSE = 'false',
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

    const reasonHeader: string = response && response.headers && response.headers['x-message'] || '[]';
    const statusCode: number = response.status;

    const successCode: boolean = statusCode >= 200 && statusCode <= 299;
    const clientError: boolean = statusCode >= 400 && statusCode <= 499;

    if (successCode || clientError) {
      Print(`REQUEST - ${reasonHeader} / Removendo a mensagem, o Request foi processado com sucesso`).ok();
      msg.del();
      if (PRINT_RESPONSE) {
        // eslint-disable-next-line no-console
        console.log('RESPONSE', response);
      }
    }

    msg.keep();
  }).catch((err: AxiosError) => {
    Print(err.message || 'Falha ao identificar a razão [AXIOS-CATCH].').err();
    msg.keep();
  });
};
