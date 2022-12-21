import React from "react";

export const ChatButton = () => {
  return (
    <div className="group">
      <div className="overflow-hidden shadow-md rounded-xl mb-1 hidden group-hover:block">
        <div className="flex items-center border-b border-b-gray-200 py-3 px-4 bg-white space-x-2 text-primary cursor-pointer font-medium hover:bg-gray-100">
          <img src="/images/comment-full.svg" /> <span>Live Chat</span>
        </div>
        <a
          href="https://wa.me/+31652373832"
          target="_blank"
          className="flex items-center py-3 px-4 bg-white text-primary font-medium space-x-2  hover:bg-gray-100 cursor-pointer">
          <img src="/images/whatsapp-full.svg" /> <span>WhatsApp</span>
        </a>
      </div>
      <Button />
    </div>
  );
};

export const Button = () => {
  return (
    <div className="flex cursor-pointer bg-[#F55A2E] items-center space-x-4 py-3 px-5 rounded-2xl text-30 text-white font-medium">
      <div>Chat met ons</div>
      <div className="flex space-x-2">
        <div className="h-[28px] aspect-square rounded-full bg-[#4a7fae70] animate-[chat-circle-bounce_1.5s_ease-in_infinite] "></div>
        <div className="h-[28px] aspect-square rounded-full bg-[#4a7fae70] animate-[chat-circle-bounce_1.5s_ease_infinite_0.5s] "></div>
        <div className="h-[28px] aspect-square rounded-full bg-[#4a7fae70] animate-[chat-circle-bounce_1.5s_ease_infinite_1s] "></div>
      </div>
    </div>
  );
};
