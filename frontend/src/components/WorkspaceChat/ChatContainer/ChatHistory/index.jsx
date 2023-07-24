import { Frown, CheckSquare } from "react-feather";
import {HistoricalMessage} from "./HistoricalMessage";
import PromptReply from "./PromptReply";

export default function ChatHistory({ history = [], workspace }) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col h-[89%] md:mt-0 pb-5 w-full justify-center items-center">
        <div className="w-fit flex items-center gap-x-2">
          <CheckSquare className="h-4 w-4 text-slate-400" />
          <p className="text-slate-400">Ask Ecochecker about Environmental Claims.</p>
        </div>
        <p className="text-slate-400 text-xs mt-3">
          A good example might be <b>"what should I take into consideration while making carbon offsets claims as a seller?"</b>
        </p>
      </div>
    );
  }

  return (
    <div
      className="h-[89%] pb-[100px]  md:pt-0 md:pb-5 mx-2 md:mx-0 overflow-y-scroll flex flex-col justify-start no-scroll"
      id="chat-history"
    >
      {history.map(
        (
          {
            uuid = null,
            content,
            sources = [],
            role,
            closed = true,
            pending = false,
            error = false,
            animate = false,
          },
          index
        ) => {
          const isLastBotReply =
            index === history.length - 1 && role === "assistant";
          if (isLastBotReply && animate) {
            return (
              <PromptReply
                key={uuid}
                uuid={uuid}
                reply={content}
                pending={pending}
                sources={sources}
                error={error}
                workspace={workspace}
                closed={closed}
              />
            );
          }
          return (
            <HistoricalMessage
              key={index}
              message={content}
              role={role}
              workspace={workspace}
              sources={sources}
              error={error}
            />
          );
        }
      )}
    </div>
  );
}
