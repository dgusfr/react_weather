import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer className={styles.footer}>
      <p>
        Desenvolvido com <span className={styles.reactText}>React</span> por
        Diego
      </p>
      <p>{currentDate}</p>
    </footer>
  );
};

export default Footer;
