import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Desenvolvido com <span className={styles.reactText}>React</span> por
        Diego
      </p>
    </footer>
  );
};

export default Footer;
