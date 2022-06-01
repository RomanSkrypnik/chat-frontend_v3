import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required(),
    name: yup.string().required(),
    password: yup.string().required().min(8).max(30)
});

export const loginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
});

export const accountSchema = yup.object().shape({
    username: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
});

export const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required(),
    passwordConfirm: yup.string().required(),
    password: yup.string().required().oneOf([yup.ref('passwordConfirm'), null], 'Password must match')
});