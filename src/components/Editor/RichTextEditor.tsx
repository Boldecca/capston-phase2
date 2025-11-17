"use client";

import { ChangeEvent } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || "text";
    const newValue =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newValue);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-200">
        <button
          onClick={() => insertMarkdown("**", "**")}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-semibold transition"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => insertMarkdown("*", "*")}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm italic transition"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => insertMarkdown("# ")}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-bold transition"
          title="Heading"
        >
          H1
        </button>
        <button
          onClick={() => insertMarkdown("- ")}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition"
          title="List"
        >
          • List
        </button>
        <button
          onClick={() => insertMarkdown("[", "](url)")}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition"
          title="Link"
        >
          🔗 Link
        </button>
        <button
          onClick={() => insertMarkdown("```\n", "\n```")}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition"
          title="Code"
        >
          &lt;/&gt; Code
        </button>
      </div>

      {/* Editor & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Write</label>
          <textarea
            value={value}
            onChange={handleChange}
            placeholder="Write your content here... Supports Markdown"
            className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
          />
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preview</label>
          <div className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 overflow-auto prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 text-sm">
              {value || <span className="text-gray-400">Preview will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}