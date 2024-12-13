import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentDots, faXmark} from '@fortawesome/free-solid-svg-icons';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      time: new Date().toLocaleTimeString('vi-VN', {hour12: false}),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {sender: 'user', text: input, time: new Date().toLocaleTimeString('vi-VN', {hour12: false})},
      ]);

      try {
        const apiKey = 'AIzaSyDXfzsjWC5D8m9_3zJo4iHecuHV-RyAD-o';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const data = {
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        };

        setInput('');

        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status == 200) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: 'bot',
              text: response.data?.candidates[0]?.content?.parts[0]?.text,
              time: new Date().toLocaleTimeString('vi-VN', {hour12: false}),
            },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {sender: 'bot', text: 'Error!', time: new Date().toLocaleTimeString('vi-VN', {hour12: false})},
          ]);
        }
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div className="fixed bottom-20 right-4">
      {!isOpen ? (
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="cursor-pointer w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg text-white"
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      ) : (
        <></>
      )}

      {isOpen && (
        <div className="w-80 h-[500px] border border-gray-400 bg-white shadow-lg rounded-lg flex flex-col">
          <div className="bg-[#44238F] mb-1 flex relative py-3 rounded-t-lg">
            <div className="text-white px-3">Chat của chúng tôi sẽ hỗ trợ bạn!</div>
            <div className="flex absolute right-3" onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon color="white" icon={faXmark} />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto px-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col max-w-[80%]`}>
                  <div
                    className={`flex px-3 border rounded-lg py-1 ${
                      msg.sender === 'user'
                        ? ' bg-blue-500 border-blue-600 text-white'
                        : 'justify-start border-gray-300 bg-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`flex text-xs font-medium text-gray-600 ${
                      msg.sender === 'user' ? 'justify-end mr-1' : 'justify-start ml-1'
                    }`}
                  >
                    {msg.time?.slice(0, 5)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              placeholder="Nhập tin nhắn..."
              className="flex-grow border m-1 border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none"
            />
            <button onClick={sendMessage} className="m-1 bg-blue-500 text-white px-2 py-1.5 rounded-lg">
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
