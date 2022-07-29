import {
    createSecret,
    formatSecrets,
    getSecrets,
    deleteSecret,
    updateSecret,
} from '../../services/SecretsService';
import {
    CONFIRMED_CREATE_SECRET_ACTION,
    CONFIRMED_DELETE_SECRET_ACTION,
    CONFIRMED_EDIT_SECRET_ACTION,
    CONFIRMED_GET_SECRETS,
} from './PostTypes';

export function deleteSecretAction(secretId, history) {
    return (dispatch, getState) => {
        deleteSecret(secretId).then((response) => {
            dispatch(confirmedDeleteSecretAction(secretId));
        });
    };
}

export function confirmedDeleteSecretAction(secretId) {
    return {
        type: CONFIRMED_DELETE_SECRET_ACTION,
        payload: secretId,
    };
}

export function createSecretAction(secretData, history) {
   
	return (dispatch, getState) => {
        createSecret(secretData).then((response) => {
			//console.log(response.data);
            const singleSecret = {
                ...secretData,
                id: response.data.id,
            };
            dispatch(confirmedCreateSecretAction(singleSecret));
        });
    };
}

export function getSecretsAction() {
    return (dispatch, getState) => {
        getSecrets().then((response) => {
			console.log(response);
            let secrets = formatSecrets(response.data);
            dispatch(confirmedGetSecretsAction(secrets));
        });
    };
}

export function confirmedCreateSecretAction(singleSecret) {
	
    return {
        type: CONFIRMED_CREATE_SECRET_ACTION,
        payload: singleSecret,
    };
}

export function confirmedGetSecretsAction(secrets) {
    return {
        type: CONFIRMED_GET_SECRETS,
        payload: secrets,
    };
}

export function confirmedUpdateSecretAction(secret) {

    return {
        type: CONFIRMED_EDIT_SECRET_ACTION,
        payload: secret,
    };
}

export function updateSecretAction(secret, history) {
    return (dispatch, getState) => {
        updateSecret(secret, secret.id).then((reponse) => {
			//console.log(reponse);
            dispatch(confirmedUpdateSecretAction(secret));
        });
			
    };
}
