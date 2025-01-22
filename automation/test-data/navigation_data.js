export const invalidNavigationData = [
    {
        description: 'Authenticated user enters non-existent url and is redirected to 404 page',
        inaccessibleURL: '/muzika',
        homeURL: '/',
    },
    {
        description: 'Authenticated user enters restricted url and is redirected to 404 page',
        inaccessibleURL: '/settings/reporting',
        homeURL: '/',
    },
];