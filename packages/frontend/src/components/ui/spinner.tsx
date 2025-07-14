const Spinner = ({ size = 4 }: { size?: number }) => {
  const pixelSize = size * 4; // Tailwind h-4 ≈ 1rem = 16px

  return (
    <>
      <style>
        {`
          @keyframes sonner-spin {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}
      </style>
      <div
        className="relative"
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 h-[8%] w-[24%] bg-zinc-100 dark:bg-zinc-900 rounded-sm"
            style={{
              transform: `rotate(${index * 30}deg) translate(146%)`,
              animation: "sonner-spin 1.2s linear infinite",
              animationDelay: `-${1.2 - index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Spinner;
