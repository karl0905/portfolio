'use client';
import React, { useState, useEffect } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useMediaQuery } from '@/global';
import DOMPurify from 'dompurify'; // Import DOMPurify

export function TerminalController() {
  const mediaQuery = useMediaQuery();
  const [terminalLineData, setTerminalLineData] = useState([]);

  useEffect(() => {
      const asciiArt =
    <pre className='whitespace-pre leading-5 -translate-y-14'>
      {`
    __ __              __   __                                   __        __     __
   / //_/____ _ _____ / /  / /   _____  _   __ ___   ____   ____/ /____ _ / /_   / /
  / ,<  / __ \`// ___// /  / /   / _// \\| | / // _ \\ / __ \\ / __  // __ \`// __ \\ / / 
 / /| |/ /_/ // /   / /  / /___/ //// /| |/ //  __// / / // /_/ // /_/ // / / // /  
/_/ |_|\\__,_//_/   /_/  /_____/\\_//__/ |___/ \\___//_/ /_/ \\__,_/ \\__,_//_/ /_//_/   
      `}
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
  }, [mediaQuery]); 

  console.log(mediaQuery);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  // Define commands and their corresponding actions
  const commands = {
    hello: () => 'Hello, world!',
    date: () => new Date().toString(),
    clear: () => {
      setTerminalLineData([]);
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
    setCurrentInput(''); // Clear current input after processing
  };

  // Function to add output to terminal
  const addOutput = (input, output) => {
    setCommandHistory(prev => [...prev, input]); // Store command history

    // Sanitize output before rendering it
    const sanitizedOutput = typeof output === 'string' ? DOMPurify.sanitize(output) : output;

    setTerminalLineData(prev => [
      ...prev,
      <TerminalOutput key={prev.length + 1}>{`$ ${input} `}</TerminalOutput>, // Display the command
      sanitizedOutput && <TerminalOutput key={prev.length + 2}>{sanitizedOutput}</TerminalOutput> // Display sanitized output only if it exists
    ]);
  };

  return (
    <div className="container">
      <Terminal
        name='Karl zsh'
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
