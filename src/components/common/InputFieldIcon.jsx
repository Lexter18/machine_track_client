import React from 'react';

export const InputFieldIcon = ({
                                   type, label, name, register, errors, trigger, validationRules,
                                   readOnly = false, autoComplete = "off", icon
                               }) => (
    <div className="input-group">
        <div className="input-group-prepend">
            <i className={icon}></i>
        </div>
        <input
            type={type}
            className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
            name={name}
            id={name}
            placeholder={label}
            {...register(name, validationRules)}
            onBlur={() => trigger(name)}
            readOnly={readOnly}
            autoComplete={autoComplete}
        />
        {errors[name] && <div className="invalid-feedback">
            {errors[name].message}
        </div>}
    </div>
);