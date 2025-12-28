import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const codeSnippet = `# Optimized for Databricks Runtime 13.3 LTS
# Architecture: Real-time Upsert Pattern (SCD Type 1)

def upsert_to_delta(microBatchDF, batchId):
    # Merge Logic: Handling Updates vs Inserts
    deltaTable.alias("target").merge(
        microBatchDF.alias("source"),
        "target.ShipmentID = source.ShipmentID") \\
      .whenMatchedUpdateAll() \\
      .whenNotMatchedInsertAll() \\
      .execute()

# Orchestration: Micro-batch Execution
stream_df.writeStream \\
    .foreachBatch(upsert_to_delta) \\
    .outputMode("update") \\
    .option("checkpointLocation", "/mnt/delta/_checkpoints") \\
    .start()`;

export const LiveCodeTerminal = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < codeSnippet.length) {
        setDisplayedCode(codeSnippet.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        // Restart after 5 seconds
        setTimeout(() => {
          setDisplayedCode("");
          setIsComplete(false);
          index = 0;
        }, 5000);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isComplete]);

  const highlightCode = (code: string) => {
    const lines = code.split('\n');
    return lines.map(line => {
      // Comments
      if (line.trim().startsWith('#')) {
        return `<span class="text-muted-foreground">${line}</span>`;
      }
      
      let result = line;
      // Keywords
      result = result.replace(/\b(def|return|import|from|as|class|if|else|for|in|while|try|except|with)\b/g, '<span class="text-purple-400">$1</span>');
      // Methods
      result = result.replace(/\.(writeStream|foreachBatch|outputMode|option|start|alias|merge|whenMatchedUpdateAll|whenNotMatchedInsertAll|execute)\b/g, '.<span class="text-cyan-400">$1</span>');
      // Strings
      result = result.replace(/("\/[^"]*")/g, '<span class="text-green-400">$1</span>');
      result = result.replace(/("target\.[^"]*"|"update"|"source"|"target")/g, '<span class="text-green-400">$1</span>');
      // Function parameters
      result = result.replace(/\b(microBatchDF|batchId|deltaTable|stream_df)\b/g, '<span class="text-yellow-300">$1</span>');
      
      return result;
    }).join('\n');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Terminal Window */}
      <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Title Bar */}
        <div className="bg-[#1a1a2e] px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm ml-4">
            <Terminal className="h-4 w-4" />
            <span>deployment_scripts/delta_live_upsert.py</span>
          </div>
        </div>

        {/* Code Area */}
        <div className="bg-[#0d0d1a] p-6 font-mono text-sm leading-relaxed min-h-[220px]">
          <pre className="whitespace-pre-wrap text-foreground">
            <code dangerouslySetInnerHTML={{ __html: highlightCode(displayedCode) }} />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2.5 h-5 bg-primary ml-0.5 align-middle"
            />
          </pre>
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Python / PySpark — Real-time Data Streaming
      </p>
    </motion.div>
  );
};
