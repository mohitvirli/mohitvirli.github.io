import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

/**
 * Partially AI Generated
 */
const ProgressLoader = ({ progress }: { progress: number }) => {
  const strokeWidth = 3;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Effect to update dimensions on window resize
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  // Clamp progress value between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  // Calculate the size of the loader SVG based on window dimensions minus 1rem total
  // We use the pixel equivalent for calculation here.
  const svgWidth = Math.max(0, windowSize.width - 16);
  const svgHeight = Math.max(0, windowSize.height - 16);

  // Calculate the dimensions and path length for the rectangle SVG element
  const halfStroke = 1;
  // Adjust the actual drawing size of the rectangle within the SVG
  const rectWidth = Math.max(0, svgWidth - strokeWidth); // Ensure size is not negative
  const rectHeight = Math.max(0, svgHeight - strokeWidth); // Ensure size is not negative

  // Calculate the total length of the rectangle's perimeter
  const perimeter = rectWidth > 0 && rectHeight > 0 ? (rectWidth * 2) + (rectHeight * 2) : 0;
  // Calculate the stroke dash offset based on progress
  const strokeDashoffset = perimeter - (perimeter * clampedProgress) / 100;

  // If size is too small (e.g., window resized very small), don't render the SVG
  if (svgWidth <= strokeWidth || svgHeight <= strokeWidth) {
      return null; // Or return a minimal placeholder
  }

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="relative w-[100px] transition-all duration-500 font-sans font-bold"
          style={{ opacity: progress === 100 ? 0 : 0.7, fontSize: '0.6rem' }}>
          <div className='absolute w-[100px] bg-black opacity-30 h-[2px]'/>
          <div
            className="absolute transition-all duration-500 ease-in-out "
            style={{
              height: '2px',
              width: `${progress}%`,
              backgroundColor: 'white',
            }}
          />
          <div className='mt-2 text-white'>
            {`${progress.toFixed(2)}%`}
          </div>
        </div>
      </div>
    );
  }
  return (
    // Use fixed positioning to overlay the loader
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
      style={{ padding: '1rem' }}
    >
      <svg
        width={svgWidth} // Use calculated SVG width
        height={svgHeight} // Use calculated SVG height
        viewBox={`0 0 ${svgWidth} ${svgHeight}`} // Set viewBox to match the SVG size
        style={{ display: svgWidth > 0 && svgHeight > 0 ? 'block' : 'none' }} // Hide if size is zero
      >
        {/* Background track for the rectangle */}
        <rect
          x={halfStroke} // Position x considering half stroke width
          y={halfStroke} // Position y considering half stroke width
          width={rectWidth} // Use calculated rectangle width
          height={rectHeight} // Use calculated rectangle height
          fill="none"
          strokeWidth={strokeWidth}
          stroke="rgba(0, 0, 0, 0.2)"
          // className={bgColor} // Apply ba ckground color class
        />
        {/* Progress indicator rectangle */}
        <rect
          x={halfStroke}
          y={halfStroke}
          width={rectWidth} // Use calculated rectangle width
          height={rectHeight} // Use calculated rectangle height
          fill="none"
          strokeWidth={strokeWidth}
          stroke="rgba(255, 255, 255, 0.7)"
          style={{
            strokeDasharray: perimeter, // Set the total length of dashes (perimeter)
            strokeDashoffset: strokeDashoffset, // Set the offset to show progress
            transition: 'stroke-dashoffset 1s ease-in-out', // Smooth transition effect
          }}
        />
      </svg>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ProgressLoader), { ssr: false });