import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import Loading from "./Loading";

const NotebookViewer = () => {
  const [searchParams] = useSearchParams();
  const filename = searchParams.get("file");
  const [notebookHtml, setNotebookHtml] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filename) {
      setError("No notebook file specified");
      setLoading(false);
      return;
    }

    fetch(`/notebooks/${filename}`)
      .then((res) => {
        if (!res.ok) throw new Error("Notebook not found");
        return res.json();
      })
      .then((notebook) => {
        // Convert notebook to HTML
        const html = convertNotebookToHtml(notebook);
        setNotebookHtml(html);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filename]);

  const convertNotebookToHtml = (notebook) => {
    if (!notebook.cells) return "<p>Invalid notebook format</p>";

    return notebook.cells
      .map((cell) => {
        if (cell.cell_type === "markdown") {
          const source = Array.isArray(cell.source)
            ? cell.source.join("")
            : cell.source;
          return `<div class="notebook-markdown">${markdownToHtml(source)}</div>`;
        } else if (cell.cell_type === "code") {
          const source = Array.isArray(cell.source)
            ? cell.source.join("")
            : cell.source;
          const outputs = cell.outputs || [];
          const outputHtml = outputs
            .map((output) => {
              if (output.output_type === "stream") {
                const text = Array.isArray(output.text)
                  ? output.text.join("")
                  : output.text;
                return `<pre class="notebook-output">${escapeHtml(text)}</pre>`;
              } else if (output.output_type === "execute_result" || output.output_type === "display_data") {
                if (output.data && output.data["image/png"]) {
                  return `<img src="data:image/png;base64,${output.data["image/png"]}" class="notebook-image" />`;
                } else if (output.data && output.data["text/plain"]) {
                  const text = Array.isArray(output.data["text/plain"])
                    ? output.data["text/plain"].join("")
                    : output.data["text/plain"];
                  return `<pre class="notebook-output">${escapeHtml(text)}</pre>`;
                }
              } else if (output.output_type === "error") {
                return `<pre class="notebook-error">${escapeHtml(output.evalue || "Error")}</pre>`;
              }
              return "";
            })
            .join("");

          return `
            <div class="notebook-cell">
              <pre class="notebook-code">${escapeHtml(source)}</pre>
              ${outputHtml ? `<div class="notebook-outputs">${outputHtml}</div>` : ""}
            </div>
          `;
        }
        return "";
      })
      .join("");
  };

  const markdownToHtml = (markdown) => {
    return markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\`(.*?)\`/gim, "<code>$1</code>")
      .replace(/\n/gim, "<br>");
  };

  const escapeHtml = (text) => {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-transparent text-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-white mb-4">Error: {error}</p>
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 text-[#F4C542] hover:text-white"
          >
            <FaArrowLeft />
            Back to tutorials
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Simple header */}
      <div className="sticky top-0 z-10 bg-[#06192e]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-[#D6E1F0] hover:text-[#F4C542] transition-colors"
          >
            <FaArrowLeft />
            Back
          </Link>
          <a
            href={`/notebooks/${filename}`}
            download
            className="inline-flex items-center gap-2 text-sm text-[#F4C542] hover:text-white transition-colors"
          >
            <FaDownload />
            Download
          </a>
        </div>
      </div>

      {/* Notebook content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <style>{`
          .notebook-markdown {
            color: #F8FAFC;
            margin-bottom: 1.5rem;
            line-height: 1.7;
          }
          .notebook-markdown h1 {
            font-size: 2rem;
            font-weight: bold;
            color: white;
            margin: 1.5rem 0 1rem;
          }
          .notebook-markdown h2 {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            margin: 1.25rem 0 0.75rem;
          }
          .notebook-markdown h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: white;
            margin: 1rem 0 0.5rem;
          }
          .notebook-markdown strong {
            color: #F4C542;
          }
          .notebook-markdown code {
            background: rgba(244, 197, 66, 0.1);
            color: #F4C542;
            padding: 0.2em 0.4em;
            border-radius: 0.25rem;
            font-family: monospace;
            font-size: 0.9em;
          }
          .notebook-cell {
            margin-bottom: 2rem;
          }
          .notebook-code {
            background: #0b2240;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 1rem;
            overflow-x: auto;
            color: #D6E1F0;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            margin-bottom: 0.5rem;
          }
          .notebook-outputs {
            margin-top: 0.5rem;
          }
          .notebook-output {
            background: #071a34;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 1rem;
            overflow-x: auto;
            color: #B8CDE6;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            margin-bottom: 0.5rem;
          }
          .notebook-error {
            background: rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.3);
            border-radius: 0.5rem;
            padding: 1rem;
            color: #fca5a5;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
          }
          .notebook-image {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 0.5rem 0;
            background: white;
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: notebookHtml }} />
      </div>
    </div>
  );
};

export default NotebookViewer;
