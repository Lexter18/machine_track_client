
export const IDENTIFICATION_TYPES = [
    { value: 'CC', label: 'CC' },
    { value: 'CE', label: 'CE' },
    { value: 'PP', label: 'PP' },
    { value: 'TE', label: 'TE' },
    { value: 'PEP', label: 'PEP' }
];

export const ROLES = {
    ADMIN: 'ROLE_ADMIN',
    OWNER: 'ROLE_OWNER',
    OPERATOR: 'ROLE_OPERATOR',
    SUPERVISOR: 'ROLE_SUPERVISOR'
};

export const ACTION_REDUCER = {
    LIST_USER_OWNER: 'LIST_USER_OWNER',
    LIST_USER_ROL: 'LIST_USER_ROL',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_ERROR: 'CREATE_USER_ERROR',

    LIST_COUNTRIES: 'LIST_COUNTRIES',
    LIST_DEPARTMENTS: 'LIST_DEPARTMENTS',
    LIST_MUNICIPALITIES: 'LIST_MUNICIPALITIES',

    LIST_ROLES: 'LIST_ROLES'


};