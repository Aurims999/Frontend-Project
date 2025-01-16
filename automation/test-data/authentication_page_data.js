import { validationMessages } from '../../src/utils/messages/popupMessages.js';
import { generateRandomString } from '../utils/services/creatingData.js';
import { randomEmail } from '../utils/services/creatingData.js';

export const login_validationTestData = [
    {
        description: 'User should be informed about empty password',
        email: process.env.EMAIL,
        password: '',
        expectedPopupMessage: validationMessages.PASSWORD_MISSING,
    },
    {
        description: 'User should be informed about wrong login data if invalid password was entered',
        email: process.env.EMAIL,
        password: 'wordpass',
        expectedPopupMessage: validationMessages.LOGIN_INVALID,
    },
    {
        description: 'User should be informed about wrong login data if invalid email was entered',
        email: 'invalidvibelift@gmail.com',
        password: process.env.PASSWORD,
        expectedPopupMessage: validationMessages.LOGIN_INVALID,
    },
    {
        description: 'User should be informed about empty email',
        email: '',
        password: process.env.PASSWORD,
        expectedPopupMessage: validationMessages.EMAIL_MISSING,
    },
];

export const registrationData = { PASSWORD_VALID: 'paswordas' };

export const registrationForm_validationTestData = [
    {
        description: 'User should be informed if he enters already taken email',
        username: generateRandomString(6),
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        confirmPassword: process.env.PASSWORD,
        expectedPopupMessage: validationMessages.EMAIL_TAKEN,
    },
    {
        description: 'User should be informed about invalid email format',
        username: generateRandomString(6),
        email: 'VBuser.com',
        password: 'paswordas',
        confirmPassword: 'paswordas',
        expectedPopupMessage: validationMessages.EMAIL_INVALID,
    },
    {
        description: 'User should be informed about empty username',
        username: '',
        email: randomEmail,
        password: 'paswordas',
        confirmPassword: 'paswordas',
        expectedPopupMessage: validationMessages.USERNAME_MISSING,
    },
    {
        description: 'User should be informed about short username',
        username: generateRandomString(4),
        email: randomEmail,
        password: 'paswordas',
        confirmPassword: 'paswordas',
        expectedPopupMessage: validationMessages.USERNAME_SHORT,
    },
    {
        description: 'User should be informed about mismatching passwords',
        username: generateRandomString(6),
        email: randomEmail,
        password: 'paswordas',
        confirmPassword: 'vilna',
        expectedPopupMessage: validationMessages.PASSWORD_MISMATCH,
    },
    {
        description: 'User should be informed that password is too short',
        username: generateRandomString(8),
        email: randomEmail,
        password: 'vilna',
        confirmPassword: 'vilna',
        expectedPopupMessage: validationMessages.PASSWORD_SHORT,
    },
];