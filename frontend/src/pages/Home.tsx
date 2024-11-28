import NewTask from "../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import DisplayTask from "../components/DisplayTask";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import { initialiseLoggedInUser, logout } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { initialiseUserTasks } from "../redux/taskManagerSlice";

const Home = () => {
  const tasks = useSelector((state: RootState) => state.taskManager.tasks);
  const userName = useSelector((state: RootState) => state.user.loggedInUser);
  const navTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseLoggedInUser(localStorage.getItem("loggedInUser")));
    dispatch(initialiseUserTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navTo("/");
  };

  return (
    <>
      <h1>Welcome {userName}</h1>
      <Button onClick={handleLogout} style={{ marginLeft: "90%" }}>
        Logout
      </Button>
      <NewTask
        onEditChange={() => {}}
        description=""
        dueDate=""
        priority="low"
        title=""
        edit={false}
        isCompleted={false}
        id={uuidv4()}
      />
      <div style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <DisplayTask
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            isCompleted={task.isCompleted}
            priority={task.priority}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
