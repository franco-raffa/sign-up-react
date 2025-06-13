import api from "./axios";

// body: objeto con los datos a enviar
export async function signupUser(body: any) {
    const url = "https://django.aakscience.com/signup/";
    const response = await api.post(url, body);
    return response.data;
} 