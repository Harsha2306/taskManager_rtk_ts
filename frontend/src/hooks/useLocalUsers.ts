import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialiseUsers } from "../redux/userSlice";

const useLocalUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loacalUsers = localStorage.getItem("users");
    if (loacalUsers) {
      dispatch(initialiseUsers(JSON.parse(loacalUsers)));
    }
  }, [dispatch]);
};

export default useLocalUsers;
