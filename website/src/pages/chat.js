import Head from 'next/head'
import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: "us3",
    encrypted: true,
});

export default function ChatApp() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleMessageSend = async () => {
        if (message !== "") {
            const newMessage = { username: username, message: message };

            // Send the message to the server
            try {
                const response = await fetch("/api/send-message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newMessage),
                });

                if (response.ok) {
                    setMessages((messages) => [...messages, newMessage]);
                    setMessage("");
                } else {
                    console.error("Failed to send message");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    useEffect(() => {
        const channel = pusher.subscribe("chat-channel");
        channel.bind("new-message", (data) => {
            setMessages((messages) => [...messages, data]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    return (
        <>
            <Head>
                <title>BoboChat</title>
                <meta name="description" content="Chat with Bobo and friends" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div>
                    <input
                        className="border border-gray-400 p-2 rounded w-full mb-4"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <div>
                        {messages.map((message, index) => (
                            <div key={index}>
                                <span className="font-bold">{message.username}: </span>
                                <span>{message.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <input
                            className="border border-gray-400 p-2 rounded w-full"
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={handleMessageSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>


    );
}
