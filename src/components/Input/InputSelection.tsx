import React, {ReactNode, useState} from 'react';
import {Input, Select} from 'antd';
import styles from './styles.module.css'
import cx from 'classnames'

type Option = { value: string; label: ReactNode | string;};

type InputSelectionProps = {
  value: number | string;
  onChange: (value: string) => void;
  options: Array<Option>;
  className?: string;

  selectorValue: { value: string; };
  selectorOnChange: (value: string) => void;
  labelInValue?: boolean;
}

export const InputSelection: React.FC<InputSelectionProps> = ({
  value,
  onChange,
  options,
  className = '',
  labelInValue = false,
  selectorValue,
  selectorOnChange,
  ...props
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleDropdownVisibleChange = (open: boolean) => {
    setIsSelectOpen(open);
  };

  return (
    <Input.Group compact className={className}>
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
        onChange={(val) => selectorOnChange(val.value)}
        className={cx(styles.combinedSelector, {[styles.fullWidth]: isSelectOpen})}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        open={isSelectOpen}
        labelInValue={labelInValue}
      />
    </Input.Group>
  );
};
