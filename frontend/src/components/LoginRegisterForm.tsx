import Input from "./Input";

type LoginRegisterFormProps = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

const LoginRegisterForm = ({
  email,
  password,
  setEmail,
  setPassword,
}: LoginRegisterFormProps) => {
  return (
    <>
      <Input
        placeholder="Enter email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
};

export default LoginRegisterForm;
