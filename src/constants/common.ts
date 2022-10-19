const defaultIrsUrl = 'ws://localhost:8090';

export const IRS_URL = process.env.SC_URL ?? defaultIrsUrl;
