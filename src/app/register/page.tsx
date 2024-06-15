import Image from "next/image";
import styles from "./page.module.css";
import RegisterForm from "../components/registerForm";


export default function Home() {
  return (
  <div className="login-page">
      <div className="login-form">
        <RegisterForm/>
      </div>
  </div>
  );
}
