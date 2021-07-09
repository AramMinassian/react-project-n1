import styles from "../styles/NotFound.module.css";
import React from "react";


function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <p>Oops! Page not found</p>
        </div>
    )
}

export default NotFound;