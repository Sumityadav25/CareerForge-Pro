import Particles from "react-tsparticles";

export default function ParticlesBg() {
  return (
    <div style={{
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 0,
      pointerEvents: "none"   // 🔥 THIS IS IMPORTANT
    }}>
      <Particles
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            color: { value: "#7c3aed" },
            opacity: { value: 0.25 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: { enable: true, color: "#4f46e5", opacity: 0.2 }
          }
        }}
      />
    </div>
  );
}
