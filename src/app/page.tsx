import Image from "next/image";
import styles from "./page.module.css";
import LoginForm from "./components/loginForm";

export default function Home() {
  return (
  <div className="login-page">
      <div className="login-form">
        <LoginForm/>
      </div>
  </div>
  );
}
