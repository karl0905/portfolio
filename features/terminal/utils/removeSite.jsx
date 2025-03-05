"use client";
import { setCookie } from "@/global";

export function removeSite() {
  // Set cookie immediately
  setCookie({
    name: "removedSite",
    value: "true",
    options: {
      expires: new Date(Date.now() + 2 * 60 * 1000),
    },
  });

  // Create overlay with absolute positioning
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:black;z-index:2147483647;display:flex;flex-direction:column;justify-content:center;align-items:center;color:white;font-family:monospace;";

  // Add message and terminal elements
  const message = document.createElement("div");
  message.textContent = "All files deleted. System corrupted.";
  message.style.cssText = "font-size:24px;margin-bottom:20px;";

  const terminal = document.createElement("div");
  terminal.style.cssText =
    "width:80%;max-width:600px;height:300px;background-color:#101828;border:1px solid #333;padding:20px;overflow-y:auto;color:#ff0000;font-family:monospace;white-space:pre;line-height:1.5;";

  overlay.appendChild(message);
  overlay.appendChild(terminal);
  document.body.appendChild(overlay);

  // Files to "delete"
  const files = [
    "system32",
    "boot.ini",
    "user_data",
    "config.sys",
    "index.html",
    "styles.css",
    "app.jsx",
  ];

  // Function to add a new line of text
  function addLine(text) {
    terminal.textContent += text + "\n";
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Spinner animation frames
  const spinner = {
    frames: ["-", "\\", "|", "/"],
    interval: 100,
  };

  // Function to run a spinner animation
  function runSpinner(duration, callback) {
    const startTime = Date.now();
    let frameIndex = 0;
    terminal.textContent += spinner.frames[0] + " ";

    const interval = setInterval(() => {
      const position = terminal.textContent.length - 2;
      frameIndex = (frameIndex + 1) % spinner.frames.length;
      terminal.textContent =
        terminal.textContent.substring(0, position) +
        spinner.frames[frameIndex] +
        " ";

      if (Date.now() - startTime >= duration) {
        clearInterval(interval);
        terminal.textContent =
          terminal.textContent.substring(0, position) + "\n";
        if (callback) callback();
      }
    }, spinner.interval);
  }

  // Start sequence
  setTimeout(() => {
    addLine("rm: removing all files");

    runSpinner(1500, () => {
      let fileIndex = 0;

      function deleteNextFile() {
        if (fileIndex < files.length) {
          addLine(`rm: removed '${files[fileIndex]}'`);
          fileIndex++;

          if (fileIndex < files.length) {
            setTimeout(deleteNextFile, 250);
          } else {
            setTimeout(() => {
              runSpinner(1500, () => {
                addLine("System shutdown imminent...");
                setTimeout(() => window.location.reload(), 2000);
              });
            }, 400);
          }
        }
      }

      setTimeout(deleteNextFile, 300);
    });
  }, 300);
}
