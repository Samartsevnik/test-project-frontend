import React, {useState} from 'react';
import { Input, Select } from 'antd';
import styles from './styles.module.css'
import cx from 'classnames'

interface InputSelectionProps {
  value: number | string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;

  selectorValue: string;
  selectorOnChange: (value: string) => void;
}

export const InputSelection: React.FC<InputSelectionProps> = ({
  value,
  onChange,
  options,
  className = '',

  selectorValue,
  selectorOnChange,
  ...props
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleDropdownVisibleChange = (open: boolean) => {
    setIsSelectOpen(open);
  };

  return (
    <Input.Group compact className={cx(className, styles.inputGroup)}>
      {!isSelectOpen && (
        <Input
          {...props}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.combinedInput}
        />
      )}
      <Select
        showSearch
        value={selectorValue}
        options={options}
        onChange={(val) => selectorOnChange(val)}
        className={cx(styles.combinedSelector, {[styles.fullWidth]: isSelectOpen})}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        open={isSelectOpen}

      />
    </Input.Group>
  );
};
