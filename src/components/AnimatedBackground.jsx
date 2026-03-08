export function AnimatedBackground({ dark }) {
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
        opacity: dark ? 0.35 : 0.15,
        filter: dark ? 'brightness(0.7)' : 'brightness(1.1) saturate(0.8)',
        transition: 'opacity 1s ease, filter 1s ease',
      }}
    >
      <source src="/nebula.mp4" type="video/mp4" />
    </video>
  );
}
