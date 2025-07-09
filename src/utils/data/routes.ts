export const ROUTES = {
    HOME: '/',
    TEST: '/test',
    RESULT: {
        ROOT: '/result',
        USERS: (id: string) => `/result/${id}`,
    },
} as const;
