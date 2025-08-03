import bgImage from "@/public/assets/math_easy.svg";

const StatsBanner = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-[70%] md:w-[60%] lg:w-[50%] mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            The math is easy. It&apos;s time to elevate.
          </h2>
          <p className="text-sm sm:text-base  max-w-2xl mx-auto mb-10">
            Experience Clarhet&apos;s AI-powered integrated strategy development,
            communication, and translation into actions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center text-center max-w-4xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold">75%</h3>
            <p className="mt-2 text-sm">Improvement in strategy execution</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">40%</h3>
            <p className="mt-2 text-sm">Reduction in costs</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">2.5</h3>
            <p className="mt-2 text-sm">Times higher revenue growth</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
