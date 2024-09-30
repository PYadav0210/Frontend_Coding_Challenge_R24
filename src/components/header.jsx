// Header.jsx
import React from 'react';
import styles from './styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Circle Locator</h1>
      <nav className={styles.nav}>
        <a href="#home" className={styles.link}>Home</a>
        <a href="#about" className={styles.link}>About</a>
        <a href="#contact" className={styles.link}>Contact</a>
      </nav>
    </header>
  );
};

export default Header;
