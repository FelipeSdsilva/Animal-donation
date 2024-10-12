import axios from 'axios';
import { Animal } from '../model/Animal';

const API_URL = 'http://localhost:8080/animals';

export const fetchAnimals = async (): Promise<Animal[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addAnimal = async (newAnimal: Animal): Promise<Animal> => {
    const response = await axios.post(API_URL, newAnimal);
    return response.data;
};
