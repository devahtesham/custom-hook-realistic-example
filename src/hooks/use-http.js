// Basically we want fetching and sending data to make a custom hook...same function for fetching and and sending data means same for GET and POST request
import { useState, useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendingRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        //   "https://react-http-request-c7eee-default-rtdb.firebaseio.com/tasks.json"
        // we config object to make this fetch function dynamic for both GET and POST
        requestConfig.url,
        {
          method: requestConfig.method ? requestConfig.method : "GET", // for POST request
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null, //send data from converting into json format
          headers: requestConfig.headers ? requestConfig.headers : {},
        }
      );
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data); // we simply hand the data off
    } catch (err) {
      setError(err.message || "Something went wrong!");
      console.log(err.message);
    }
    setIsLoading(false);
  }, []);
  // ab jo component is custom hook ko use kregaa us ko yahan se 3 cheezon ka access chaheye... isLoading, error and sendingRequest ...tu mjhy islye in teenon ko laazmii return bhi krwaana paregaa...
  return {
    /*
      isLoading:isLoading,
      error:error,
      sendingRequest:sendingRequest
      */
    // instead of this we use a modern JS shorthand property
    isLoading,
    error,
    sendingRequest,
  };
};
// ab jahan bhi mn apny is custom component ko use krngaa tu mjhy as an arguement aek object r aek function dena paregaa
export default useHttp;
