import { useEffect, useRef, memo, useState } from "react";
import { AlertTriangle } from "react-feather";
import Jazzicon from "../../../../UserIcon";
import { v4 } from "uuid";
import { decode as HTMLDecode } from "he";
import renderMarkdown from "../../../../../utils/chat/markdown";
import { Book, Settings, HelpCircle, PlayCircle, CheckSquare } from "react-feather";

export const HistoricalMessage = function HistoricalMessage({
  message,
  role,
  workspace,
  sources = [],
  error = false,
}) {
  console.log(message);
  console.log(sources);
  const replyRef = useRef(null);
  useEffect(() => {
    if (replyRef.current)
      replyRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [replyRef.current]);

  if (role === "user") {
    return (
      <div className="flex justify-start  items-end " >
        <div className="ml-2 pb-3 px-12 w-100 ">
		<a className="flex text-slate-800 mt-5">
		  <CheckSquare className="h-6 w-6 "/>
		  <p  className="font-semibold text-xl ml-2 text-slate-800 ">{message}</p>
		</a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-start mb-4 items-end">
        <Jazzicon size={30} user={{ uid: workspace.slug }} />
        <div className="ml-2 max-w-[75%] bg-primary dark:bg-stone-700 rounded-t-2xl rounded-br-2xl rounded-bl-sm">
          <span
            className={`inline-block p-2 rounded-lg bg-red-50 text-red-500`}
          >
            <AlertTriangle className="h-4 w-4 mb-1 inline-block" /> Could not
            respond to message.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div ref={replyRef} className="flex justify-start items-end mb-4 border shadow mx-14 rounded">
      <div className="ml-2 pb-3  px-3  w-100 dark:bg-stone-700 rounded-t-2xl rounded-br-2xl rounded-bl-sm">
        <Citations sources={sources} />
		<a className="flex text-secondary mt-5">
		  <PlayCircle className="h-6 w-6 "/>
		  <p  className="font-semibold ml-1 ">Answer</p>
		</a>
        <span
          className="text-sm md:text-base flex flex-col gap-y-1 mt-3"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(message) }}
        />
      </div>
    </div>
  );
}

export const Citations = ({ sources = [] }) => {
  const [show, setShow] = useState(false);
  if (sources.length === 0) return null;

  return (
    <div className="flex flex-col mt-4 justify-left">
	  <a className="flex text-secondary">
		  <Book className="h-6 w-6 "/>
		  <p  className="font-semibold ml-1 ">Sources</p>
	  </a>
	  <div className="w-full flex flex-wrap items-center gap-4 mt-1 doc__source mt-4">
		{sources.map((source) => {
		  const { id = null, title, url } = source;
		  const handleClick = () => {
			if (!url) return false;
			window.open(url, "_blank");
		  };
		  return (
			<button
			  key={id || v4()}
			  onClick={handleClick}
			  className=" transition-all duration-300 w-fit border p-3 text-gray-900  hover:text-slate-200 hover:bg-gray-500 hover:dark:text-gray-900 dark:bg-stone-400 dark:hover:bg-stone-300 rounded text-sm  "
			>
			  <a>{HTMLDecode(title)}</a>
			</button>
		  );
		})}
	  </div>
	  <p className="w-fit text-gray-700 dark:text-stone-400 text-xs mt-1">
		*citation may not be relevant to end result.
	  </p>
    </div>
  );
};

