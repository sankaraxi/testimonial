import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
import { Copy } from "lucide-react";
const code = `
    "use client";

    import { WallOfLove } from "@sidharth1222/testi";
    import "@sidharth1222/testi/dist/index.css"

    export default function Wall() {
        return <WallOfLove userId="6W9e2UcFx-a9y5ZaoDY_r"/>
    }
`;

export default function CodePreview() {
  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    alert("Code copied to clipboard!");
  };

  return (
    <div className="relative bg-black min-h-[150px] rounded-lg p-1 mt-7 w-[900px]">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2   text-white p-2 rounded"
        aria-label="Copy code"
      >
        <Copy />
      </button>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code.trim()}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} code-preview`}
            style={{ padding: "20px" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
