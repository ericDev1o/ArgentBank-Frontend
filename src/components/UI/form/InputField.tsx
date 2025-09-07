/**
 * See aliases paths in /tsconfig.json
 */
import '@/css/components/UI/form/form.css'

export const InputField = (
    { 
        id,
        name,
        label, 
        type, 
        value, 
        onChange,
        disabled,
        error         
    }
) => (
  <div className='input-wrapper'>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <span 
        id={`${id}-error`}
        className='error-color form-input-error'
        >
        {error}
      </span>
    )}
  </div>
);