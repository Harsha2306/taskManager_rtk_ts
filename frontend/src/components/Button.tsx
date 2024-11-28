type ButtonProps = React.ComponentPropsWithoutRef<"button">;

const Button = ({ children, ...btnProps }: ButtonProps) => {
  return <button {...btnProps}>{children}</button>;
};

export default Button;
