import axiosInstance from './AxiosInstance';

const URL_SECRETS = 'http://localhost:8008/api/secrets/'

export function getSecrets() {
    return axiosInstance.get(URL_SECRETS);
}

export function createSecret(secretData) {
    return axiosInstance.post(URL_SECRETS, secretData);
}

export function updateSecret(secret, secretId) {
    return axiosInstance.put(`${URL_SECRETS}${secretId}`, secret);
}

export function deleteSecret(secretId) {
    return axiosInstance.delete(`${URL_SECRETS}${secretId}`);
}

export function formatSecrets(secretsData) {
    let secrets = [];
    for (let key in secretsData) {
        secrets.push({ ...secretsData[key], id: key });
    }

    return secrets;
}
