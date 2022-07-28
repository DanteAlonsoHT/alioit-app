import { createSelector } from 'reselect';

export const getSecretById = (state, secretId) =>
    state.secrets.secrets.find((secret) => secret.id === secretId);

export const getSecret = () => createSelector([getSecretById], (secret) => secret);
