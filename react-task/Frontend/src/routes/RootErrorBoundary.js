import styles from "./RootErrorBoundary.module.css";
import Header from "../comnponents/Header/Header";
const RootErrorBoundary = () => {
  // const error = useRouteError();
  return (
    <>
    <Header />
      <div className={styles.error_page}>
       
        <h1>404</h1>
       
      </div>
    </>
  );
};

export default RootErrorBoundary;
