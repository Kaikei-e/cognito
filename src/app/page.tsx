import styles from "./page.module.css";
import {SchemaIndex} from "@/app/schema";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <SchemaIndex/>
            </div>
        </main>
    );
}
