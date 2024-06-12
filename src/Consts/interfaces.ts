interface LoginValues{
    username: string,
    password: string
}

interface RegistrationValues {
    email: string;
    username: string;
    password: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface UserProfile{
    id: string;
    email: string;
    username: string;
}