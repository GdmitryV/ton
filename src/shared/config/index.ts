const getEnvVariable = (key: string) => {
    if (process.env[key] === undefined) {
        throw new Error(`Variable ${key} is required!`);
    }
    return process.env[key] || '';
}

export const API_URL = getEnvVariable('REACT_APP_API_URL');