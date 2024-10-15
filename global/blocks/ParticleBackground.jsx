"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticleBackground() {
  const [init, setInit] = useState(false);

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container); // Log the container when particles are loaded
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#1a1a1a", // Dark background color
        },
      },
      fpsLimit: 60, // Frame rate limit
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disable click interaction
          },
          onHover: {
            enable: false, // Disable hover interaction
          },
        },
      },
      particles: {
        color: {
          value: "#cccccc", // Light gray particle color
        },
        links: {
          enable: false, // Disable links between particles
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "destroy", // Particles disappear when they leave the canvas
          },
          random: true,
          speed: 1, // Slower particle speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 30, // Fewer particles for a more subtle effect
        },
        opacity: {
          value: 0.3, // Lower opacity for subtlety
        },
        shape: {
          type: "circle", // Shape of particles
        },
        size: {
          value: { min: 2, max: 4 }, // Smaller size range for particles
        },
      },
      detectRetina: true, // Enable retina detection for better rendering on high DPI screens
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>; // Return empty if not initialized yet
}
