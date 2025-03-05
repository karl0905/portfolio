"use client";
import React, { useState, useEffect } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { useMediaQuery } from "@/global";
import DOMPurify from "dompurify";
import { useTerminalStore, figlet, removeSite } from "@/features/terminal";
import skillsContent from "@/features/terminal/assets/skills.md";
import educationContent from "@/features/terminal/assets/education.md";
import experienceContent from "@/features/terminal/assets/experience.md";

export function TerminalController() {
  const mediaQuery = useMediaQuery();
  const {
    terminalLineData,
    setTerminalLineData,
    addTerminalLine,
    addCommand,
    clearTerminal,
  } = useTerminalStore();
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    if (mediaQuery && terminalLineData.length === 0) {
      const asciiArt = (
        <pre className="text-[8px]/[10px] tracking-[1px] ">{figlet}</pre>
      );

      const lines = [
        mediaQuery === "desktop" || mediaQuery === "tablet" ? (
          <TerminalOutput key="asciiArt">{asciiArt}</TerminalOutput>
        ) : null,
        <TerminalOutput key="welcome1">
          Welcome to the Karl terminal
        </TerminalOutput>,
        <TerminalOutput key="welcome2">
          Type a command to get started
        </TerminalOutput>,
        <TerminalOutput key="welcome3">
          Here are a few suggestions:
        </TerminalOutput>,
        <TerminalOutput key="suggestion1">
          <strong>help</strong> --to see all available commands
        </TerminalOutput>,
        <TerminalOutput key="suggestion2">
          <strong>hello</strong> --to greet the terminal
        </TerminalOutput>,
        <TerminalOutput className="whitespace-normal" key="suggestion3">
          <strong>ls</strong> --to list directory contents
        </TerminalOutput>,
        <TerminalOutput className="whitespace-normal" key="suggestion4">
          <strong>cat</strong> --to concatenate files and print the standard
          output
        </TerminalOutput>,
      ].filter(Boolean);

      setTerminalLineData(lines);
    }
  }, [mediaQuery, setTerminalLineData, terminalLineData.length]);

  // Definition of files in terminal
  const current_dir = [
    {
      name: "skills.md",
      content: skillsContent,
    },
    {
      name: "education.md",
      content: educationContent,
    },
    {
      name: "experience.md",
      content: experienceContent,
    },
  ];

  // Define commands and their corresponding actions
  const commands = {
    hello: () => "Hello, world!",
    date: () => new Date().toString(),
    clear: () => {
      clearTerminal();
      return ""; // Clear command returns empty output
    },
    echo: (args) => {
      // If no arguments are provided, return an empty string
      if (args.length === 0) {
        return ""; // Do nothing as per zsh behavior
      }
      // Join the arguments to form the echoed string
      return args.join(" ");
    },
    help: () => {
      const allCommands = Object.keys(commands)
        .filter((command) => command !== "default")
        .join(", ");
      return `Available commands: ${allCommands}`;
    },
    ls: (args) => {
      if (args.length === 0) {
        return current_dir.map((file) => file.name).join(" ");
      }

      const filename = args[0];
      const foundFile = current_dir.find((file) => file.name === filename);

      if (foundFile) {
        return filename;
      } else {
        return (
          <span key="cat-error" style={{ color: "red" }}>
            "{filename}": No such file or directory
          </span>
        );
      }
    },
    cat: (args) => {
      if (args.length === 0) {
        return (
          <span key="cat-error" style={{ color: "red" }}>
            cat: missing file operand
          </span>
        );
      }
      for (const arg of args) {
        const file = current_dir.find((file) => file.name === arg);
        if (!file) {
          return (
            <span key={`cat - error${args} `} style={{ color: "red" }}>
              cat: {arg}: No such file or directory
            </span>
          );
        } else {
          return file.content + "\n";
        }
      }
      return output.trim();
    },
    rm: (args) => {
      if (args.length === 0 || (args[0] === "-rf" && args.length === 1)) {
        return (
          <span key="no-args" style={{ color: "red" }}>
            rm{args[0] === "-rf" && " -rf"}: missing operand
          </span>
        );
      }

      let fullCommand;
      if (args[0] === "-rf") {
        // Only consider args after "-rf" for the command
        fullCommand = "rm -rf " + args.slice(1).join(" ");
      } else {
        fullCommand = "rm " + args.join(" ");
      }

      const dangerousPatterns = [/rm\s+-rf\s+[~.*\/]+/, /rm\s+[~.*\/]+/];
      if (dangerousPatterns.some((pattern) => pattern.test(fullCommand))) {
        return removeSite();
      }

      return (
        <span key="rm-error" style={{ color: "red" }}>
          Cannot remove: {args[0] === "-rf" ? args.slice(1).join(" ") : args.join(" ")} <br />
        </span>
      );
    },
    default: (input) => {
      if (input.length > 0) {
        return (
          <span key={`error - ${input} `} style={{ color: "red" }}>
            zsh: command not found: {input}
          </span>
        );
      } else {
        return;
      }
    },
  };

  // Handle terminal input
  const handleInput = (input) => {
    const trimmedInput = input.trim();
    const inputParts = trimmedInput.split(" ");
    const commandName = inputParts[0].toLowerCase();
    const args = inputParts.slice(1);

    // Check if command exists, otherwise use default
    const command = commands[commandName] || commands.default;

    // Execute the command with appropriate arguments
    const output =
      command === commands.default ? command(trimmedInput) : command(args);

    addOutput(trimmedInput, output);
    addCommand(trimmedInput);
    setCurrentInput("");
  };

  // Function to add output to terminal
  const addOutput = (input, output) => {
    // Generate unique keys using timestamp
    const timeNow = Date.now();

    // Sanitize output before rendering it
    const sanitizedOutput =
      typeof output === "string" ? DOMPurify.sanitize(output) : output;

    addTerminalLine(
      <TerminalOutput
        key={`input - ${timeNow} `}
      >{`$ ${input} `}</TerminalOutput>,
    );
    if (sanitizedOutput) {
      addTerminalLine(
        <TerminalOutput key={`output - ${timeNow} `}>
          {sanitizedOutput}
        </TerminalOutput>,
      );
    }
  };

  return (
    <div className="w-screen h-screen">
      <Terminal
        name=""
        colorMode={ColorMode.Dark}
        onInput={handleInput}
        onChange={setCurrentInput} // Update current input as user types
        value={currentInput} // Bind current input to terminal
        prompt="$"
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
}
