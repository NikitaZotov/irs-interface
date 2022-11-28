import { IRS_URL, ML_IRS_URL } from '../constants/common';
import { IrsClient } from './client/IrsClient';

export const client = new IrsClient(IRS_URL);
export const mlClient = new IrsClient(ML_IRS_URL);
