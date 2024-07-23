export const IDENTIFICATION_TYPES = [
    {value: 'CC', label: 'CC'},
    {value: 'CE', label: 'CE'},
    {value: 'PP', label: 'PP'},
    {value: 'TE', label: 'TE'},
    {value: 'PEP', label: 'PEP'}
];

export const OWNER_IDENTIFICATION_TYPES = [
    {value: 'NI', label: 'NIT'},
    {value: 'CC', label: 'CC'}
];

export const ROLES = {
    ADMIN: {name: 'ROLE_ADMIN', id: 1},
    OPERATOR: {name: 'ROLE_OPERATOR', id: 2},
    SUPERVISOR: {name: 'ROLE_SUPERVISOR', id: 3},
    OWNER: {name: 'ROLE_OWNER', id: 4}
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