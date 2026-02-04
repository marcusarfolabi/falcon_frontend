import { useState } from "react";
import { useEmailAction } from "@/hooks/useEmailAction";
import { Trash2, RotateCcw, Loader2, AlertTriangle, RotateCw } from "lucide-react";
import { Modal } from "../common/Modal";

type ActionType = "trash" | "delete" | null;

export default function EmailActions({
  emailId,
  isTrash,
}: {
  emailId: string;
  isTrash: boolean;
}) {
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const actionMutation = useEmailAction();

  const handleConfirmAction = () => {
    if (!activeAction) return;

    actionMutation.mutate(
      { id: emailId, action: activeAction },
      {
        onSuccess: () => setActiveAction(null),
      },
    );
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {isTrash ? (
        <>
          <button
            onClick={() =>
              actionMutation.mutate({ id: emailId, action: "restore" })
            }
            disabled={actionMutation.isPending}
            className="flex items-center gap-2 px-2 cursor-pointer bg-slate-100 py-2 sm:px-3 sm:py-1.5 text-xs font-bold text-blue-600  rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
            title="Restore to Inbox"
          >
            {actionMutation.isPending &&
            actionMutation.variables?.action === "restore" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <RotateCw size={16} />
            )}
            <span className="hidden sm:inline">Restore to Inbox</span>
          </button>

          <button
            onClick={() => setActiveAction("delete")}
            disabled={actionMutation.isPending}
            className="flex items-center gap-2 px-2 cursor-pointer  py-2 sm:px-3 sm:py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
            title="Delete Permanently"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete Permanently</span>
          </button>
        </>
      ) : (
        <button
          onClick={() => setActiveAction("trash")}
          disabled={actionMutation.isPending}
          className="p-2 hover:bg-slate-100 cursor-pointer bg-red-100 rounded-lg text-slate-500 hover:text-red-600 transition-all"
          title="Move to Trash"
        >
          <Trash2 className="text-red-500" size={18} />
        </button>
      )}

      <Modal
        isOpen={!!activeAction}
        onClose={() => setActiveAction(null)}
        title={
          activeAction === "delete" ? "Permanent Deletion" : "Move to Trash"
        }
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-red-50 rounded-xl sm:rounded-2xl text-red-600 shrink-0">
              <AlertTriangle size={20} className="sm:w-6 sm:h-6" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {activeAction === "delete" ? (
                <>
                  Are you sure? This is{" "}
                  <span className="font-bold text-slate-900">irreversible</span>
                  . The message will be purged from the server.
                </>
              ) : (
                "Move this email to trash? You can recover it later from the Trash folder."
              )}
            </p>
          </div>

          {/* Modal Footer: Stacked on mobile, side-by-side on desktop */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
            <button
              onClick={() => setActiveAction(null)}
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold cursor-pointer text-slate-500 hover:bg-red-50 rounded-xl sm:rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={actionMutation.isPending}
              onClick={handleConfirmAction}
              className="w-full sm:w-auto flex items-center cursor-pointer justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl sm:rounded-2xl shadow-lg shadow-red-100 transition-all disabled:opacity-50"
            >
              {actionMutation.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {activeAction === "delete" ? "Delete Forever" : "Move to Trash"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
