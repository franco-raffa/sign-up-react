import api from "./axios";

export async function getCountries() {
    const url = "https://django.aakscience.com/countries/";
    const response = await api.get(url);
    return response.data;
} 