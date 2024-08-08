import React from 'react';

export const InputField = ({ type, label, name, register, errors, trigger, validationRules, readOnly = false  }) => (
  <div className="form-floating mb-3">
    <input
      type={type}
      className={`form-control form-control-sm ${errors[name] ? 'is-invalid' : ''}`}
      name={name}
      id={name}
      placeholder={label}
      {...register(name, validationRules)}
      onBlur={() => trigger(name)}
      readOnly={readOnly}
    />
    <label htmlFor={name} className="form-label">{label}</label>
    {errors[name] && <div className="invalid-feedback">
      {errors[name].message}
    </div>}
  </div>
);