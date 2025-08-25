import styles from '../../../css/components/UI/form/form.module.css'

export const InputField = (
    { 
        label, 
        type, 
        value, 
        onChange,
        disabled,
        error, 
        id 
    }
) => (
  <div className='input-wrapper'>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
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