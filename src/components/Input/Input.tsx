import React from 'react';
import { Input as AntInput } from 'antd';
import styles from './styles.module.css'

interface InputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  fieldName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className = '',
  fieldName,
  ...props
}) => {
  return (
    <div className={className}>
      {label && <label htmlFor={fieldName} className={styles.label}>{label}</label>}
      <AntInput
        {...props}
        value={value}
        name={fieldName}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};