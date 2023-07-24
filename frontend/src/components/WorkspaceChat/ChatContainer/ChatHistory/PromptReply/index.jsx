import { memo, useEffect, useRef, useState } from "react";
import { AlertTriangle, PlayCircle, Book } from "react-feather";
import Jazzicon from "../../../../UserIcon";
import { v4 } from "uuid";
import { decode as HTMLDecode } from "he";
import renderMarkdown from "../../../../../utils/chat/markdown";
import { Citations } from "../HistoricalMessage";

function PromptReply({
  uuid,
  reply,
  pending,
  error,
  workspace,
  sources = [],
  closed = true,
}) {
  const replyRef = useRef(null);
  useEffect(() => {
    if (replyRef.current)
      replyRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [replyRef.current]);

  if (!reply && !sources.length === 0 && !pending && !error) return null;
  if (pending) {return(
    <div
      key={uuid}
      ref={replyRef}
      className="flex justify-start items-end mb-4 border shadow mx-14 roundedmb-4 flex justify-start items-end"
    >
      <div className="ml-2 pb-3  px-3  w-100 dark:bg-stone-700 rounded-t-2xl rounded-br-2xl rounded-bl-sm">
		<a className="flex text-secondary mt-5">
		  <Book className="h-6 w-6 "/>
		  <p  className="font-semibold ml-1 ">Sources</p>
		</a>
        <span
          className="whitespace-pre-line font-[500] text-sm md:text-base flex flex-col gap-y-1 mt-6"
        >
            <div className="ml-4 mb-3 dot-falling"></div>
		</span>
		<a className="flex text-secondary mt-5">
		  <PlayCircle className="h-6 w-6 "/>
		  <p  className="font-semibold ml-1 ">Answer</p>
		</a>
        <span
          className="whitespace-pre-line font-[500] text-sm md:text-base flex flex-col gap-y-1 mt-6"
        >
            <div className="ml-4 mb-3  dot-falling"></div>
		</span>
      </div>
    </div>
);}

  if (error) {
    return (
      <div className="chat__message flex justify-start mb-4 items-center">
        <Jazzicon size={30} user={{ uid: workspace.slug }} />
        <div className="ml-2 py-3 px-4 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-slate-100 ">
          <div className="bg-red-50 text-red-500 rounded-lg w-fit flex flex-col p-2">
            <span className={`inline-block`}>
              <AlertTriangle className="h-4 w-4 mb-1 inline-block" /> Could not
              respond to message.
            </span>
            <span className="text-xs">Reason: {error || "unknown"}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={uuid}
      ref={replyRef}
      className="flex justify-start items-end mb-4 border shadow mx-14 roundedmb-4 flex justify-start items-end"
    >
      <div className="ml-2 pb-3  px-3  w-100 dark:bg-stone-700 rounded-t-2xl rounded-br-2xl rounded-bl-sm">
        <Citations sources={sources} />
		<a className="flex text-secondary mt-5">
		  <PlayCircle className="h-6 w-6 "/>
		  <p  className="font-semibold ml-1 ">Answer</p>
		</a>
        <span
          className="text-sm md:text-base flex flex-col gap-y-1 mt-3"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(reply) }}
        />
      </div>
    </div>
  );
}


export default memo(PromptReply);
