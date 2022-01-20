import { AxiosRequestConfig } from 'axios';
export interface ProcessEnv {
    [key: string]: string | undefined;
}
export interface IOptions extends AxiosRequestConfig {
    dataType: string;
}
