export const ROUTES = {
    HOME: '/',
    TEST: '/test',
    RESULT: {
        ROOT: '/result',
        DETAIL: (mbti: string, name: string, imgName: string) => `/result?name=${name}&imgName=${imgName}&mbti=${mbti}`,
    },
} as const;
