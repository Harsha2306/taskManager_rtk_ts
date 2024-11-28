import { useEffect, useState } from "react";
import Button from "../components/Button";
import LoginRegisterForm from "../components/LoginRegisterForm";
import { useDispatch, useSelector } from "react-redux";
import useLocalUsers from "../hooks/useLocalUsers";
import { RootState } from "../store";
import { useNavigate } from "react-router";
import { addUser } from "../redux/userSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const users = useSelector((state: RootState) => state.user.users);
  useLocalUsers();

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleRegister = () => {
    if (
      email.trim().length === 0 ||
      !email.includes("@") ||
      password.trim().length === 0
    )
      alert("invalid email or password");
    else {
      const user = users.find((u) => u.userName === email);
      if (user) alert("user already exists, please login");
      else {
        dispatch(addUser({ userName: email, password }));
        navTo("/");
      }
    }
  };

  return (
    <>
      <LoginRegisterForm
        key="login"
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
      />
      <Button style={{ marginRight: "20px" }} onClick={handleRegister}>
        Register
      </Button>
      <Button style={{ marginRight: "20px" }} onClick={() => navTo("/")}>
        Back to login
      </Button>
    </>
  );
};

export default Register;
