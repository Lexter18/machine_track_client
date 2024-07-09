export const validationMessages = {
    firstName: {
        required: 'Primer nombre es obligatorio.',
        minLength: 'Primer nombre debe tener al menos 3 letras.',
    },
    firstSurname: {
        required: 'Primer apellido es obligatorio.',
        minLength: 'Primer apellido debe tener al menos 3 letras.',
    },
    phone: {
        required: 'Número de celular es obligatorio.',
        pattern: 'Celular debe ser numérico.',
        minLength: 'Número de celular debe tener 10 dígitos.',
        maxLength: 'Número de celular debe tener 10 dígitos.',
    },
    identification: {
        required: 'Número de identificacion es obligatorio.',
        pattern: 'La identificacion debe ser numérico.',
        minLength: 'Identificacion debe tener al menos 4 dígitos.',
        maxLength: 'Identificacion debe tener 10 dígitos o menos.',
    },
    password: {
        required: 'La contraseña es obligatoria.',
        minLength: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y por lo menos un número.',
        pattern: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y por lo menos un número.',
    },
    confirmPassword: {
        required: 'Confirmar la contraseña es obligatorio.',
        match: 'Las contraseñas deben coincidir.',
    },
    email: {
        required: 'El email es obligatorio',
        pattern: 'El email no tiene un formato válido'
    },
    username: {
        required: 'El usuario es obligatorio',
        minLength: 'El nombre de usuario debe tener al menos 4 caracteres',
        maxLength: 'El nombre de usuario debe tener 20 caracteres o menos'
    },
    identificationType: {
        required: 'Debe seleccionar un tipo de identificación'
    },
    role: {
        required: 'Debe seleccionar un rol'
    }

};