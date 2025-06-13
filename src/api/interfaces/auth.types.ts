export interface SignupData {
    user_type: 'researcher' | 'investor' | 'institution_staff' | 'service_provider';
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    country: string;
}

export interface FormErrors {
    user_type?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    password?: string;
    country?: string;
    general?: string;
}

export interface SignupResponse {
    user_type: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    country: string;
}

