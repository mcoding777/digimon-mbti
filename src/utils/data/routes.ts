export const ROUTES = {
    HOME: '/',
    TEST: '/test',
    RESULT: {
        ROOT: '/result',
        USERS: (mbti: string) => `/result?mbti=${mbti}`,
    },
} as const;
