import { ReactNode } from 'react';
import styles from './Dashboard.module.css';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;

