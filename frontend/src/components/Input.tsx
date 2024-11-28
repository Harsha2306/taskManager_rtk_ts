type InputProps = React.ComponentProps<"input">;

const Input = (props: InputProps) => {
  return (
    <>
      <input style={{ margin: "10px 0px", height:'30px', width:'350px' }} {...props} />
      <br />
    </>
  );
};

export default Input;
