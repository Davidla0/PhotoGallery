import axios from 'axios';

export const fetchPhotos = (offset: number = 0, limit: number = 2000) => {
    return axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=${limit}`);
};
