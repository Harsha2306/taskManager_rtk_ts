import { useState } from "react";
import Button from "../components/Button";
import LoginRegisterForm from "../components/LoginRegisterForm";
import { useNavigate } from "react-router";
import { initialiseLoggedInUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import useLocalUsers from "../hooks/useLocalUsers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navTo = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  useLocalUsers();

  const handleLogin = () => {
    const user = users.find((u) => u.userName === email);
    if (user) {
      dispatch(initialiseLoggedInUser(email));
      navTo("/home");
    } else alert("User not found. Please check credentials");
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
      <Button style={{ marginRight: "20px" }} onClick={handleLogin}>
        Login
      </Button>
      <Button
        style={{ marginRight: "20px" }}
        onClick={() => navTo("/register")}
      >
        Register
      </Button>
    </>
  );
};

export default Login;
