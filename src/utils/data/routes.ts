export const ROUTES = {
    HOME: '/',
    TEST: '/test',
    RESULT: {
        ROOT: '/result',
        DETAIL: (mbti: string, name: string, imgName: string) => `/result?mbti=${mbti}&name=${name}&imgName=${imgName}`,
    },
} as const;
