import axios from 'axios';

const BASE_URL = 'https://freeaccessibilitychecker.skynettechnologies.com/api/check-page-compliance-new'

export const checkCompliance = async (url, standard) => {
    const response = await axios.post(BASE_URL, {
        url: 'skynettechnologies.com',
        is_first: 1
    });
    return response.data;
};