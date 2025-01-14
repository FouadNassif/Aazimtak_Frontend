'use server';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'token';
export async function getUserAccessToken() {
    return (await cookies()).get(COOKIE_NAME)?.value;
}

export async function setUserAccessToken(accessToken: string) {
    (await cookies()).set(COOKIE_NAME, accessToken, { path: '/', maxAge: 365 * 24 * 60 * 60 });
}