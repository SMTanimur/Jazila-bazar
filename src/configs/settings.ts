export const BaseClientUrl = process.env.NEXT_PUBLIC_APP_URL;
export const BaseApiUrl = process.env.NEXT_PUBLIC_API_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GoogleApiRedirect = BaseApiUrl + '/v1/auth/google/login';
export const ClientSession = process.env.NEXT_PUBLIC_CLIENT_SESSION;
