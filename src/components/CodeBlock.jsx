import React, { useState } from "react";
import { FaCheck, FaCopy, FaTerminal, FaPython } from "react-icons/fa";

const CodeBlock = ({ code, language = "Python", title = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const getIcon = () => {
    const lang = language.toLowerCase();
    if (lang === "python" || lang === "py") return <FaPython className="text-[#3dd6d0]" />;
    return <FaTerminal className="text-[#F4C542]" />;
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-white/15 bg-[#051326] shadow-lg">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0b2240] px-4 py-2 text-xs">
        <div className="flex items-center gap-2 font-mono text-[#D6E1F0]">
          {getIcon()}
          <span className="font-semibold text-white">{title || language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-[#D6E1F0] transition-all hover:bg-white/15 hover:text-white active:scale-95"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <FaCheck className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <FaCopy />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-[#E2E8F0]">
        <pre className="selection:bg-[#F4C542]/30 selection:text-white">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
