export const IDENTIFICATION_TYPES = [
    {value: 'CC', label: 'cédula ciudadania'},
    {value: 'CE', label: 'cédula extranjería'},
    {value: 'PP', label: 'pasaporte'},
    {value: 'TE', label: 'tarjeta extranjeria'},
    {value: 'PEP', label: 'permiso permanencia'}
];

export const OWNER_IDENTIFICATION_TYPES = [
    {value: 'NIT', label: 'NIT'},
    {value: 'CC', label: 'cédula ciudadania'}
];

export const ROLES = {
    ADMIN: {name: 'ROLE_ADMIN', id: 1},
    OPERATOR: {name: 'ROLE_OPERATOR', id: 2},
    SUPERVISOR: {name: 'ROLE_SUPERVISOR', id: 3},
    OWNER: {name: 'ROLE_OWNER', id: 4}
};