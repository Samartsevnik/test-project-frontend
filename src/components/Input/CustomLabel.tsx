import { FC } from 'react';
import styles from './styles.module.css'

type ISelectionLabelProps = {
  label: string;
  icon?: string
}


export const CustomLabel: FC<ISelectionLabelProps> = ({icon, label}) => {
  return (
    <span className={styles.customLabel}>
      {icon && <img src={icon} alt={`${label} icon`} className="icon" />}
      <span style={{marginLeft: '5px'}}>{label.toUpperCase()}</span>
    </span>
  );
};
