import React, { useEffect, useState, useCallback, useMemo } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
// importing our custom hook useHttp
import useHttp from "./hooks/use-http";

function App() {
  //------ we dont need isLoading and error states because we managed in our custom hook useHttp
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  // here in App component we are sending a get request
  // useHttp takes two arguement one is object and second is function in which our response data is passing
  //here we place the main logic in our custom hook and managed the specific response data in here App component
  //-------- This Http returns an objects with three keys and on last propety we do Alias(change the name of a function) which we commonly do in javascript
  const { isLoading, error, sendingRequest: fetchTasks } = useHttp();

  useEffect(() => {
    console.log("run");
    const transformTasks = (tasksObject) => {
      const loadedTasks = [];

      for (const taskKey in tasksObject) {
        loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://react-http-request-c7eee-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error} // the error state which goes down to Tasks component is GET request error
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
