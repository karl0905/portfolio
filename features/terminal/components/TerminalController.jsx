'use client';
import React, { useState, useEffect } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useMediaQuery } from '@/global';
import DOMPurify from 'dompurify';
import { useTerminalStore, figlet } from '@/features/terminal';
import skillsContent from '@/features/terminal/assets/skills.md'
import educationContent from '@/features/terminal/assets/education.md'
import experienceContent from '@/features/terminal/assets/experience.md'

export function TerminalController() {
  const mediaQuery = useMediaQuery();
  const {
    terminalLineData,
    setTerminalLineData,
    addTerminalLine,
    addCommand,
    clearTerminal
  } = useTerminalStore();
  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    if (terminalLineData.length === 0) {
      const asciiArt =
        <pre className='whitespace-pre leading-5 -translate-y-14'>
          {figlet}
        </pre>

      const lines = [
        mediaQuery === 'desktop' ? <TerminalOutput key="asciiArt">{asciiArt}</TerminalOutput> : null,
        <TerminalOutput key="welcome1">Welcome to the Karl terminal</TerminalOutput>,
        <TerminalOutput key="welcome2">Type a command to get started</TerminalOutput>,
        <TerminalOutput key="welcome3">Here are a few suggestions:</TerminalOutput>,
        <TerminalOutput key="suggestion1"><strong>help </strong> --to see all available commands</TerminalOutput>,
        <TerminalOutput key="suggestion2"><strong>hello </strong> --to greet the terminal</TerminalOutput>,
        <TerminalOutput className="whitespace-normal" key="suggestion3"><strong>echo &#123;input&#125; </strong> --echo something out in the terminal</TerminalOutput>
      ];

      setTerminalLineData(lines);
    }
  }, [mediaQuery, setTerminalLineData, terminalLineData.length]);

  console.log(mediaQuery);

  // Definition of files in terminal
  const current_dir = [
    {
      "name": "skills.md",
      "content": skillsContent
    },
    {
      "name": "education.md",
      "content": educationContent
    },
    {
      "name": "experience.md",
      "content": experienceContent
    }
  ]

  // Define commands and their corresponding actions
  const commands = {
    hello: () => 'Hello, world!',
    date: () => new Date().toString(),
    clear: () => {
      clearTerminal();
      return ''; // Clear command returns empty output
    },
    echo: (args) => {
      // If no arguments are provided, return an empty string
      if (args.length === 0) {
        return ''; // Do nothing as per zsh behavior
      }
      // Join the arguments to form the echoed string
      return args.join(' ');
    },
    help: () => 'Available commands: hello, date, clear, echo',
    ls: () => {
      return current_dir.map((file) => file.name).join(' ');
    },
    cat: (args) => {
      if (args.length === 0) {
        return (
          <span style={{ color: 'red' }}>
            cat: missing file operand
          </span>
        )
      }
      for (const arg of args) {
        const file = current_dir.find((file) => file.name === arg);
        if (!file) {
          return (
            <span style={{ color: 'red' }}>
              cat: {arg}: No such file or directory
            </span>
          )
        } else {
          return file.content + '\n';
        }
      }
      return output.trim();
    },
    default: (input) => {
      return (
        <span style={{ color: 'red' }}>
          zsh: command not found: {input}
        </span>
      );
    }
  };

  // Handle terminal input
  const handleInput = (input) => {
    const [commandName, ...args] = input.split(' '); // Split input into command and arguments
    const lowerCaseCommandName = commandName.toLowerCase(); // Convert command name to lowercase
    const command = commands[lowerCaseCommandName] || commands.default;

    // Pass original input for echo and error messages
    const output = command(command === commands.default ? input : args); // Pass arguments or full input based on command

    // Update terminal output and command history
    addOutput(input, output);
    addCommand(input);
    setCurrentInput(''); // Clear current input after processing
  };

  // Function to add output to terminal
  const addOutput = (input, output) => {
    // Sanitize output before rendering it
    const sanitizedOutput = typeof output === 'string' ? DOMPurify.sanitize(output) : output;

    addTerminalLine(<TerminalOutput>{`$ ${input}`}</TerminalOutput>);
    if (sanitizedOutput) {
      addTerminalLine(<TerminalOutput>{sanitizedOutput}</TerminalOutput>);
    }
  };

  return (
    <div className="w-screen h-screen">
      <Terminal
        name=''
        colorMode={ColorMode.Dark}
        onInput={handleInput}
        onChange={setCurrentInput} // Update current input as user types
        value={currentInput} // Bind current input to terminal
        prompt='$'
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
}
