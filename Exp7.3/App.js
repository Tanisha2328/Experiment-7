import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [messages, setMessages] = useState([
    { type: "system", text: "Alice joined the chat" },
    { user: "Alice", text: "Hi there!", time: "10:32" },
    { type: "system", text: "Bob joined the chat" },
    { user: "Bob", text: "Hello!", time: "10:34" },
    { user: "Alice", text: "How are you?", time: "10:34" }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState("");

  const chatRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      user: "You",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setTyping("");

    // Fake typing reply
    setTimeout(() => {
      setTyping("Bob");

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            user: "Bob",
            text: "Nice!",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          }
        ]);
        setTyping("");
      }, 1500);
    }, 500);
  };

  // Typing
  const handleTyping = (e) => {
    setInput(e.target.value);
    setTyping("You");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">

      <div
        style={{
          width: "450px",
          background: "#f5f6f7",
          borderRadius: "10px",
          padding: "15px",
          border: "1px solid #ddd"
        }}
      >

        {/* Header */}
        <div className="d-flex justify-content-between mb-3">
          <h5>Chat Room</h5>
          <span>Online: 2 Alice, Bob</span>
        </div>

        {/* Messages */}
        <div
          ref={chatRef}
          style={{
            height: "300px",
            overflowY: "auto",
            background: "white",
            borderRadius: "10px",
            padding: "10px",
            border: "1px solid #ddd"
          }}
        >
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">

              {/* System message */}
              {msg.type === "system" ? (
                <div className="text-muted text-center">
                  {msg.text}
                </div>
              ) : (
                <div className="d-flex align-items-start">

                  {/* Avatar */}
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      background: "#dee2e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px",
                      fontWeight: "bold"
                    }}
                  >
                    {msg.user.charAt(0)}
                  </div>

                  {/* Message */}
                  <div style={{ flex: 1 }}>
                    <strong>{msg.user}</strong>
                    <div>{msg.text}</div>
                  </div>

                  {/* Time */}
                  <small style={{ fontSize: "12px" }}>
                    {msg.time}
                  </small>

                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="text-muted">
              {typing} is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="d-flex mt-3">
          <input
            className="form-control me-2"
            placeholder="Type a message..."
            value={input}
            onChange={handleTyping}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>

    </div>
  );
}

export default App;