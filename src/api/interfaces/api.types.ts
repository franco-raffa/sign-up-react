export interface Country {
    id: number;
    full_name: string;
    official_name: string;
    cca2: string;
    ccn3: string;
    capital: string;
    cca3: string;
    cioc: string;
    flag_shape: string;
}

export interface CountriesResponse {
    next: string | null;
    previous: string | null;
    results: Country[];
}

export interface ApiError {
    message: string;
    status?: number;
    data?: any;
}
