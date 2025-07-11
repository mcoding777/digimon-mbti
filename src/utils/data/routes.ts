export const ROUTES = {
    HOME: '/',
    TEST: '/test',
    RESULT: {
        ROOT: '/result',
        DETAIL: (mbti: string) => `/result/${mbti}`,
    },
} as const;
