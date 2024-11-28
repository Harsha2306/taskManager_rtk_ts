import { useState } from "react";
import useDate from "../hooks/useDate";
import Button from "./Button";
import NewTask from "./Task";
import { type Task } from "../types/Type";

const DisplayTask = ({
  id,
  title,
  description,
  dueDate,
  isCompleted,
  priority,
}: Task) => {
  const [checked, setChecked] = useState(isCompleted);
  const [edit, setEdit] = useState(false);
  const displayDueDate = useDate(dueDate);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <br />
      {!edit && (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{displayDueDate}</p>
          <p>Priority : {priority}</p>
          <Button
            style={{
              backgroundColor: "Blue",
              color: "white",
              padding: "10px",
              borderRadius: "3px",
            }}
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </Button>
        </>
      )}
      {edit && (
        <NewTask
          description={description}
          dueDate={dueDate}
          priority={priority}
          title={title}
          edit={true}
          isCompleted={checked}
          id={id}
          onEditChange={() => {
            setEdit(false);
          }}
        />
      )}
    </div>
  );
};

export default DisplayTask;
