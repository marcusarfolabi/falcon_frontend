"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
    ],
    content: content,
    immediatelyRender: false, // <--- Add this line here
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none w-full h-full min-h-[150px] p-4 text-sm leading-relaxed max-w-none",
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-col h-full">
      {/* 1. The Toolbar (Gmail Style) */}
      <div className="flex items-center gap-1 px-4 py-1 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-slate-200 ${editor.isActive("bold") ? "bg-slate-200" : ""}`}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-slate-200 ${editor.isActive("italic") ? "bg-slate-200" : ""}`}
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-4 bg-slate-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-slate-200 ${editor.isActive("bulletList") ? "bg-slate-200" : ""}`}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-slate-200 ${editor.isActive("orderedList") ? "bg-slate-200" : ""}`}
        >
          <ListOrdered size={16} />
        </button>
        <div className="w-px h-4 bg-slate-300 mx-1" />
        <button onClick={addLink} className="p-1.5 rounded hover:bg-slate-200">
          <LinkIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30"
        >
          <Unlink size={16} />
        </button>
      </div>

      {/* 2. The Editable Area */}
      <div
        className="flex-1 overflow-y-auto cursor-text"
        onClick={() => editor.commands.focus()}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
