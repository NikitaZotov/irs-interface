import { IRS_URL } from '../constants';
import { IrsClient } from './client/IrsClient';

export const client = new IrsClient(IRS_URL);
