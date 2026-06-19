import './BackgroundParticles.css';

const BackgroundParticles = () => {
  return (
    <div className="bg-particles" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="bg-particle" />
      ))}
    </div>
  );
};

export default BackgroundParticles;
