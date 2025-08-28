/**
 * See aliases paths in /tsconfig.json
 */
import styles from '@/css/components/UI/form/form.module.css'

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
        className={`${styles.errorColor} ${styles.formInputError}`}
        >
        {error}
      </span>
    )}
  </div>
);