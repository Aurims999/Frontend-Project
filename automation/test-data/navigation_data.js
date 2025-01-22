export const invalidNavigationData = [
    {
        description: 'Authenticated user enters non-existent url and is redirected to 404 page, then goes back to Home page',
        inaccessibleURL: '/muzika',
    },
    {
        description: 'Authenticated user enters restricted url and is redirected to 404 page, then goes back to Home page',
        inaccessibleURL: '/settings/reporting',
    },
];