import React, { useState, useEffect } from "react";
import { Book, Settings } from "react-feather";
import * as Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Workspace from "../../../models/workspace";
import ManageWorkspace, {
  useManageWorkspaceModal,
} from "../../Modals/MangeWorkspace";
import paths from "../../../utils/paths";
import { useParams } from "react-router-dom";
import { isDev } from '../../../utils/featureflag.js';

export default function ActiveWorkspaces() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWs, setSelectedWs] = useState(null);
  const { showing, showModal, hideModal } = useManageWorkspaceModal();

  useEffect(() => {
    async function getWorkspaces() {
      const workspaces = await Workspace.all();
      setLoading(false);
      setWorkspaces(workspaces);
    }
    getWorkspaces();
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton.default
          height={36}
          width="100%"
          count={3}
          baseColor="#292524"
          highlightColor="#4c4948"
          enableAnimation={true}
        />
      </>
    );
  }

  return (
    <>
      {workspaces.map((workspace) => {
        const isActive = workspace.slug === slug;
        return (
          <div
            key={workspace.id}
            className="flex gap-x-2 items-center justify-between w-full"
          >
            <a
              href={isActive ? null : paths.workspace.chat(workspace.slug)}
              className={`flex w-full shadow gap-x-2 p-2 rounded-lg h-[50px] border justify-start items-center ${
                isActive
                  ? "text-secondary dark:bg-stone-600"
                  : "hover:bg-slate-100  dark:hover:bg-stone-900 "
              }`}
            >
              <Book className="h-4 w-4 flex-shrink-0" />
              <p className=" text-xs font-semibold  ">
                {workspace.name}
              </p>
            </a>
			{isDev && <button
              onClick={() => {
                setSelectedWs(workspace);
                showModal();
              }}
              className="rounded-md bg-stone-200 p-2 h-[36px] w-[15%] flex items-center justify-center text-slate-800 hover:bg-stone-300 group dark:bg-stone-800 dark:text-slate-200 dark:hover:bg-stone-900 dark:border dark:border-stone-800"
            >
              <Settings className="h-3.5 w-3.5 transition-all duration-300 group-hover:rotate-90" />
            </button>
			}
          </div>
        );
      })}
      {showing && !!selectedWs && (
        <ManageWorkspace hideModal={hideModal} providedSlug={selectedWs.slug} />
      )}
    </>
  );
}
