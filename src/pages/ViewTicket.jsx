import { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaPaperclip } from "react-icons/fa";
import moment from "moment";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { apis } from "../apis";
import { useUser } from "../context/UserContext";
import axiosWithHeaders from "../helper/axiosWithHeaders";

export default function ViewTicket() {
 const { ticketId } = useParams();
  const { user } = useUser();

  const [ticket, setTicket] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);


  const fetchTicket = async () => {
    try {
      const res = await axiosWithHeaders.get(`${apis.GET_TICKETS}/${ticketId}`);
      setTicket(res?.data?.data);
    } catch (err) {
      console.log("Error fetching ticket", err);
    }
  };

  const fetchMessageHistory = async () => {
    try {
      const res = await axiosWithHeaders.get(`${apis.GET_MESSAGES}?ticket_id=${ticketId}`);
      setMessages(res?.data?.data || []);
    } catch (err) {
      console.log("Error fetching messages", err);
    }
  };

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_APP_BASEURL, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token"),
      },
      withCredentials: true,
    });

    // Join ticket room
    socketRef.current.emit("join-ticket-room", ticketId);

    // Receive messages
    socketRef.current.on("new-message", (msg) => {
      if(msg?.from_id === user?.id) return;
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [ticketId]);

  useEffect(() => {
    fetchTicket();
    fetchMessageHistory();
  }, []);


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSend = async () => {
    if (!newMessage.trim()) return;

    // if message is coming from brand side then have to set the admin id as to_id in the backend.
    const msg = {
      ticket_id: ticketId,
      from_id: user?.id,
      to_id: ticket?.brand_id,
      senderName: user?.first_name || "User",
      message: newMessage,
      created_at: new Date().toISOString(),
    };

    try {
      await axiosWithHeaders.post(apis.CREATE_MESSAGE, msg);
    } catch (err) {
      console.log("Error sending message", err);
    }

    // Update UI immediately
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");

    // Emit to socket room
    // socketRef.current.emit("send_message", msg);
  };
  return (
    <div className="container-fluid py-3 text-light">
      <h4 className="fw-bold mb-4">View Ticket</h4>

      <div className="row g-4">

        {/* LEFT PANEL */}
        <div className="col-12 col-xl-6">
          <div className="card bg-transparent border-secondary shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Ticket Details</h6>

              <div className="row g-3">

                <div className="col-md-6">
                  <label className="small text-secondary">Subject</label>
                  <div className="p-2 bg-secondary bg-opacity-10 border border-secondary rounded mt-1 text-light small">
                    {ticket.subject}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="small text-secondary">Status</label>
                  <div className="p-2 bg-secondary bg-opacity-10 border border-secondary rounded mt-1 text-light small">
                    {ticket.status}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="small text-secondary">Category</label>
                  <div className="p-2 bg-secondary bg-opacity-10 border border-secondary rounded mt-1 text-light small">
                    {ticket.category}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="small text-secondary">Created Date</label>
                  <div className="p-2 bg-secondary bg-opacity-10 border border-secondary rounded mt-1 text-light small">
                    {moment(ticket.created_at).format("MMM DD, YYYY hh:mm A")}
                  </div>
                </div>

                <div className="col-12">
                  <label className="small text-secondary">Description</label>
                  <div
                    className="p-3 bg-secondary bg-opacity-10 border border-secondary rounded mt-1 text-light small"
                    style={{ minHeight: "100px" }}
                  >
                    {ticket.description}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - CHAT */}
        <div className="col-12 col-xl-6">
          <div className="card bg-transparent border-secondary shadow-sm h-100">
            <div className="card-body d-flex flex-column">

              {/* Chat Header */}
              <div className="border-bottom border-secondary pb-2 mb-3">
                <h5 className="fw-semibold m-0">Chat With Brand</h5>
              </div>

              {/* CHAT BOX */}
              <div
                ref={chatBoxRef}
                className="flex-grow-1 overflow-auto mb-3 pe-2"
                style={{ maxHeight: "400px", minHeight: "400px" }}
              >
                {messages.map((msg) => (
                  <div key={msg.id} className="d-flex gap-2 mb-3 text-light small">
                    <FaUserCircle size={35} className="text-secondary" />
                    <div>
                      <div className="fw-semibold text-light">{msg.sender}</div>
                      <div>{msg.message}</div>
                      <small className="text-secondary">
                        {moment(msg.created_at).format("MMM DD, YYYY hh:mm A")}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* INPUT BAR */}
              <div className="border-top border-secondary pt-3 d-flex align-items-center gap-3">
                <FaPaperclip className="text-secondary fs-4" />

                <input
                  type="text"
                  className="form-control bg-secondary bg-opacity-10 text-light border border-secondary"
                  placeholder="Write your comment..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                <button className="btn btn-primary px-4" onClick={handleSend}>
                  Send
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
