import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { deviceType, osName } from "react-device-detect";
import getUserId from "./util/getUserId";

const CLIENTKEY = "63b64e43f3f26c136bf2b898";

let id = getUserId();
//identify which user is being used
console.log(id);
(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: CLIENTKEY,
    user: {
      key: id,
      //dynamically set these custom attributes using the deviceType and osName selectors from the npm package
      email:'acheuk@launchdarkly.com',
      custom: {
        device: deviceType,
        operatingSystem: osName,
        type:"asdf"
      },
      privateAttributeNames: ['email']
    },
  });
  console.log(LDProvider);



  ReactDOM.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById("root")
  );
  console.log("version 1.0")
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
