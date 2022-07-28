import {
    CONFIRMED_CREATE_SECRET_ACTION,
    CONFIRMED_DELETE_SECRET_ACTION,
    CONFIRMED_EDIT_SECRET_ACTION,
    CONFIRMED_GET_SECRETS,
    CREATE_SECRET_ACTION,
} from '../actions/PostTypes';

const initialState = {
    secrets: [],
};

export default function SecretsReducer(state = initialState, actions) {
    if (actions.type === CREATE_SECRET_ACTION) {
        const secret = {
            secret: 'Sample Description 2asdasdas',
        };

        const secrets = [...state.secrets];
        secrets.push(secret);
        return {
            ...state,
            secrets,
        };
    }

    if (actions.type === CONFIRMED_DELETE_SECRET_ACTION) {
        const secrets = [...state.secrets];
        const secretIndex = secrets.findIndex(
            (secret) => secret.id === actions.payload,
        );

        secrets.splice(secretIndex, 1);

        return {
            ...state,
            secrets,
        };
    }

    if (actions.type === CONFIRMED_EDIT_SECRET_ACTION) {
        const secrets = [...state.secrets];
        const secretIndex = secrets.findIndex(
            (secret) => secret.id === actions.payload.id,
        );

        secrets[secretIndex] = actions.payload;
        return {
            ...state,
            secrets,
        };
    }

    if (actions.type === CONFIRMED_CREATE_SECRET_ACTION) {
        const secrets = [...state.secrets];
        secrets.push(actions.payload);

        return {
            ...state,
            secrets,
        };
    }

    if (actions.type === CONFIRMED_GET_SECRETS) {
        return {
            ...state,
            secrets: actions.payload,
        };
    }
    return state;
}
