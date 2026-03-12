export function AnimatedBackground({ dark }) {
  if (!dark) return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.35,
        filter: 'brightness(0.7)',
        transition: 'opacity 1s ease',
      }}
    >
      <source src="/nebula.mp4" type="video/mp4" />
    </video>
  );
}
