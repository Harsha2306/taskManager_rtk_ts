import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/taskManagerSlice";
import React, { useState } from "react";
import { type Priority, type Task } from "../types/Type";

const options: Priority[] = ["low", "medium", "high"];

type TaskProps = Task & {
  edit: boolean;
  onEditChange: () => void;
};

const NewTask = ({
  title,
  description,
  dueDate,
  priority,
  edit,
  isCompleted,
  id,
  onEditChange,
}: TaskProps) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(title);
  const [taskDesc, setTaskDesc] = useState(description);
  const [date, setDate] = useState(dueDate);
  const [priority_, setPriority_] = useState<Priority>(priority);

  const reset = () => {
    setTaskName("");
    setTaskDesc("");
    setDate("");
    setPriority_("low");
  };

  return (
    <div>
      <Input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        type="text"
        placeholder="Task name"
      />
      <Input
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        type="text"
        placeholder="Task description"
      />
      <Input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
      />
      <Dropdown
        value={priority_}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedOpt = options.find((opt) => opt === e.target.value);
          if (selectedOpt) setPriority_(selectedOpt);
        }}
        label="Priority"
        options={options}
        getOptionLabel={(option) => option}
        getOptionValue={(option) => option}
        style={{ marginTop: "10px" }}
      />
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            backgroundColor: "16A34A",
            color: "",
            padding: "10px",
            borderRadius: "3px",
            marginLeft: "30%",
            marginRight: "12px",
          }}
          onClick={() => {
            if (edit) onEditChange();
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            borderRadius: "3px",
          }}
          onClick={() => {
            const task = {
              id,
              title: taskName,
              description: taskDesc,
              priority: priority_,
              isCompleted,
              dueDate: !edit
                ? `${new Date().getFullYear()}-${String(
                    new Date().getMonth() + 1
                  ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
                    2,
                    "0"
                  )}`
                : date,
            };
            dispatch(!edit ? addTask(task) : updateTask(task));
            if (!edit) reset();
            else if (edit) onEditChange();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default NewTask;
