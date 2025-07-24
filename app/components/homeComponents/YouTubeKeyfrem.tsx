import React from 'react';

const YouTubeKeyfrem = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4">

        <div className="relative overflow-hidden pb-[56.25%] h-0 rounded-xl shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/rzzHEdyzae8?si=wDuYoHzOMTqi4A2y"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
    
    </section>
  );
};

export default YouTubeKeyfrem;
