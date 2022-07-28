import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { connect, useDispatch } from "react-redux";

import { createSecretAction } from "../store/actions/SecretActions";

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

const UserData = () => {
  const [secret, setSecret] = useState({ secret: "" });
  const [errors, setErrors] = useState({ secret: "" });
  const [message, setMessage] = useState([]);
  const [pagination, setPagination] = useState(10);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `ws://localhost:8008/ws/meta-data/`
  );

  const sendMessageToServer = useCallback(() => sendMessage("Checked"), []);

  const dispatch = useDispatch();

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      const dataSocket = JSON.parse(lastMessage.data);
      console.log(dataSocket);
      setMessage(dataSocket);
    }
  }, [lastMessage]);

  return (
    <div className="container mt-5 pt-5">
      <div className="row mt-5 pt-5 d-flex justify-content-center align-items-center">
        <h1 className="text-center">Welcome to User Data REST Websocket!</h1>
        <p className="mt-3 fs-6" style={{ maxWidth: "500px" }}>
          {" "}
          Use the REST API Websocket to update data in real time!
        </p>
        <ul>
          {message.length > 0 &&
            message
              .filter((mes) => mes.id < pagination && mes.id > (pagination-10))
              .map((mes) => <li className="">{mes.secret}</li>)}
        </ul>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            {Array.from(Array(Math.floor(message.length / 10)+1),(x,i)=>i).map((index) => (
              <li class="page-item">
                <a class="page-link" href="#" onClick={() => setPagination(10*(index+1))}>
                  {
                    index + 1
                  }
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <form className="card p-5">
          <h5>{ message.length } secrets so far.</h5>
          <label className="fs-3 mb-3 text-center">Add a secret!</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSecret({ secret: e.target.value })}
          />
          {errors.secret !== "" && (
            <span className="text-danger">{errors.secret}</span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              if (secret.secret !== "") {
                dispatch(createSecretAction(secret));
                setErrors({ secret: "" });
              } else setErrors({ secret: "Secret can not be empty" });
            }}
            className="btn btn-primary mt-3"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserData;
