import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import PromptInput from "./PromptInput";
import Workspace from "../../../models/workspace";
import handleChat from "../../../utils/chat";
import { isMobile } from "react-device-detect";
import { SidebarMobileHeader } from "../../Sidebar";

export default function ChatContainer({ workspace, knownHistory = [] }) {
  const [message, setMessage] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [chatHistory, setChatHistory] = useState(knownHistory);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message || message === "") return false;

    const prevChatHistory = [
      ...chatHistory,
      { content: message, role: "user" },
      {
        content: "",
        role: "assistant",
        pending: true,
        userMessage: message,
        animate: true,
      },
    ];

    setChatHistory(prevChatHistory);
    setMessage("");
    setLoadingResponse(true);
  };

  useEffect(() => {
    async function fetchReply() {
      const promptMessage =
        chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
      const remHistory = chatHistory.length > 0 ? chatHistory.slice(0, -1) : [];
      var _chatHistory = [...remHistory];

      if (!promptMessage || !promptMessage?.userMessage) {
        setLoadingResponse(false);
        return false;
      }

      const chatResult = await Workspace.sendChat(
        workspace,
        promptMessage.userMessage,
        window.localStorage.getItem(`workspace_chat_mode_${workspace.slug}`) ??
          "chat"
      );
      handleChat(
        chatResult,
        setLoadingResponse,
        setChatHistory,
        remHistory,
        _chatHistory
      );
    }
    loadingResponse === true && fetchReply();
  }, [loadingResponse, chatHistory, workspace]);

  return (
    <div
      style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
      className="transition-all duration-500 relative my-4 mr-3 rounded-lg bg-white dark:bg-black-900 min-w-[78.5%]  p-[18px] h-full shadow-lg"
    >
      {isMobile && <SidebarMobileHeader />}
      <div className="flex flex-col h-full w-full flex">
        <ChatHistory history={chatHistory} workspace={workspace} />
        <PromptInput
          workspace={workspace}
          message={message}
          submit={handleSubmit}
          onChange={handleMessageChange}
          inputDisabled={loadingResponse}
          buttonDisabled={loadingResponse}
        />
      </div>
    </div>
  );
}
