import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function AdminMessages() {
  const BASE = import.meta.env.VITE_API_BASE_URL;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${BASE}/api/admin/messages`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(`${BASE}/api/admin/messages/${id}`, {
        method: "PATCH",
        credentials: "include",
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: "read" } : msg
        )
      );
    } catch {
      alert("Failed to mark message as read");
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;

    try {
      await fetch(`${BASE}/api/admin/messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch {
      alert("Failed to delete message");
    }
  };

    if (loading) {
      return <Loading 
                message="Loading messages..." 
                margin="20"/>
    }
    if (error) {
      return <p className="text-center mt-32 text-red-600">{error}</p>
  }

  return (
    <div>
      {messages.length === 0 ? (
        <p className="text-gray-600 text-xl flex justify-center">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-lg p-5 shadow-sm border ${
                msg.status === "new"
                  ? "border-yellow-400"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">
                    {msg.name}{" "}
                    <span className="text-sm text-gray-500">
                      ({msg.email})
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {msg.status === "new" ? (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="lg:py-2 lg:px-4 text-xs bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Mark Read
                    </button>
                  ) : (
                    <span className="text-sm bg-purple-500 rounded-full px-2 text-white flex items-center">
                      read
                    </span>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="lg:py-2 lg:px-4 text-xs bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}