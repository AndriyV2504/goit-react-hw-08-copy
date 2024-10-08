import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage ";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import ContactsPage from "../../pages/ContactsPage/ContactsPage";
import NotFound from "../../pages/NotFound/NotFound";
import { refreshUser } from "../../redux/auth/operations";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? null : (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>PHONEBOOK📋</h1>
      </header>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegistrationPage />
            </RestrictedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
