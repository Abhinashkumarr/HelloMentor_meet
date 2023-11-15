import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import './Lobby.css';
import { BsList } from "react-icons/bs";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
    <div className="main--container">
      <div className="nav">
        <div className="navLeft">
          <h4>Hello Meet</h4>
        </div>
        <div className="navRight">
          <p>Support</p>
          <p>Enquiry</p>
          <span><h4>Sign Up</h4>
       </span>
          <select>
            <option>English</option>
            <option>Hindi</option>
            <option>Italiano</option>
          </select>
        </div>
        <div className="mobileview">
          <BsList  />
        </div>
      </div>
      </div>

        <div className="middlePart">
        <div className="leftdivision"></div>
        <div className="mobgrid">
        </div>
        <div className="rightDivision">
        <h2>Sign In</h2>
      <form onSubmit={handleSubmitForm}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <br />
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room Number"
          required
        />
        <br /><br />
        <button>Join</button>
      </form>  
        </div>
      </div>

      </>
  );
};

export default LobbyScreen;
