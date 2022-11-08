import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const createdTask = (taskText, postReqResponseData) => {
    // ab yahan maslaa ye hy k ye function mn apny custom hook mn applyData() ki jgaa use krraha hoon r applyData srf aek arguement leraha hy r mene yahan two dye hen tu ab is function ko pre-configure krna parega pehly with javascript .bind(null/this, extra_parameter )
    // yahan uper jo parameter mn taskText jaraha hyy ye bind() method ki wjaa se accessible hyy kiun k is function mn a/cc to useHttp hook applyData() function, srf aek parameter allow hyy
    const generatedId = postReqResponseData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };
  const { isLoading, error, sendingRequest: sendingTasks } = useHttp();

  const enterTaskHandler = async (taskText) => {
    sendingTasks(
      {
        url: "https://react-http-request-c7eee-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: taskText },
      },
      createdTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
