import { useEffect, useRef } from "react";

interface City {
  x: number;
  y: number;
  name: string;
}

interface Pulse {
  startCity: number;
  endCity: number;
  progress: number;
  speed: number;
}

const cities: City[] = [
  { x: 0.12, y: 0.35, name: "Los Angeles" },
  { x: 0.18, y: 0.25, name: "Seattle" },
  { x: 0.35, y: 0.45, name: "Dallas" },
  { x: 0.45, y: 0.28, name: "Chicago" },
  { x: 0.55, y: 0.55, name: "Atlanta" },
  { x: 0.7, y: 0.35, name: "New York" },
  { x: 0.6, y: 0.22, name: "Detroit" },
  { x: 0.8, y: 0.45, name: "Miami" },
];

const connections: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 6], [4, 5], [4, 7], [5, 6], [5, 7],
];

export const LogisticsNetworkMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulsesRef = useRef<Pulse[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize pulses
    const initPulses = () => {
      pulsesRef.current = connections.map((conn) => ({
        startCity: conn[0],
        endCity: conn[1],
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      }));
    };

    initPulses();

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw connections
      ctx.strokeStyle = "rgba(0, 127, 255, 0.15)";
      ctx.lineWidth = 1;

      connections.forEach(([i, j]) => {
        const c1 = cities[i];
        const c2 = cities[j];
        ctx.beginPath();
        ctx.moveTo(c1.x * w, c1.y * h);
        ctx.lineTo(c2.x * w, c2.y * h);
        ctx.stroke();
      });

      // Draw cities
      cities.forEach((city) => {
        ctx.beginPath();
        ctx.arc(city.x * w, city.y * h, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 127, 255, 0.3)";
        ctx.fill();
      });

      // Draw and update pulses
      pulsesRef.current.forEach((pulse, i) => {
        const start = cities[pulse.startCity];
        const end = cities[pulse.endCity];

        const x = start.x + (end.x - start.x) * pulse.progress;
        const y = start.y + (end.y - start.y) * pulse.progress;

        // Glow effect
        const gradient = ctx.createRadialGradient(
          x * w, y * h, 0,
          x * w, y * h, 12
        );
        gradient.addColorStop(0, "rgba(0, 127, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(0, 127, 255, 0.3)");
        gradient.addColorStop(1, "rgba(0, 127, 255, 0)");

        ctx.beginPath();
        ctx.arc(x * w, y * h, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x * w, y * h, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 127, 255, 1)";
        ctx.fill();

        // Update progress
        pulsesRef.current[i].progress += pulse.speed;
        if (pulsesRef.current[i].progress > 1) {
          pulsesRef.current[i].progress = 0;
          // Randomly swap direction
          if (Math.random() > 0.5) {
            const temp = pulsesRef.current[i].startCity;
            pulsesRef.current[i].startCity = pulsesRef.current[i].endCity;
            pulsesRef.current[i].endCity = temp;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};
