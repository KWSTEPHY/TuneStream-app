
import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon

const Home = ({ searchResults }) => {
  

  const albumListRef = useRef(null);
  const playlistListRef = useRef(null);
  

  const scrollAmount = 600;
  const scrollDelay = 5000;
  const resumeDelay = 15000;
  let currentPosition = 0;

  const scrollAnimeList = (listRef) => {
    setInterval(function () {
      currentPosition += scrollAmount;
      if (listRef.current) {
        listRef.current.scroll({
          left: currentPosition,
          behavior: "smooth",
        });

        if (
          currentPosition >=
          listRef.current.scrollWidth - listRef.current.clientWidth
        ) {
          currentPosition = 0;
        }
      }
    }, scrollDelay);
  };

  useEffect(() => {
    scrollAnimeList(trackListRef);
    scrollAnimeList(artistListRef);
    scrollAnimeList(albumListRef);
    scrollAnimeList(playlistListRef);
  }, []);

  useEffect(() => {
    if (isPlaying && iframeRef.current) {
      iframeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isPlaying]);

 

  const handleManualScroll = (listRef, direction) => {
    clearInterval(scrollAnimeList);
    const scrollStep = direction === "left" ? -scrollAmount : scrollAmount;
    const newPosition = listRef.current.scrollLeft + scrollStep;
    listRef.current.scroll({
      left: newPosition,
      behavior: "smooth",
    });

    // Resume auto-scrolling after a delay
    currentPosition = newPosition;
    setTimeout(() => scrollAnimeList(listRef), resumeDelay);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        

        {searchResults.albums && searchResults.albums.items.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl text-white font-bold mt-8 mb-4">Albums</h2>
            <div className="relative">
              <button
                id="scroll-left-btn"
                className="absolute left-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(albumListRef, "left")}
              >
                <MdKeyboardDoubleArrowLeft size={48} />
              </button>
              <ul
                className="overflow-x-hidden overflow-y-none whitespace-nowrap space-x-4"
                ref={albumListRef}
              >
                {searchResults.albums.items.map((album) => (
                  <li
                    key={album.id}
                    className="inline-block text-white/90 bg-black/70 rounded-lg shadow-lg w-64 border-2 border-white-200 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                  >
                    <button onClick={() => handlePlay("album", album?.id)}>
                      <img
                        className="h-64 w-full object-cover"
                        src={album.images[0]?.url || ""}
                        alt={album.name}
                      />
                      <div className="flex-1 m-4 overflow-hidden">
                        <h3 className="pt-2 text-lg font-bold">
                          {album.name.length > 20
                            ? album.name.substring(0, 20) + "..."
                            : album.name}
                        </h3>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                id="scroll-right-btn"
                className="absolute right-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(albumListRef, "right")}
              >
                <MdKeyboardDoubleArrowRight size={48} />
              </button>
            </div>
          </div>
        )}

        {searchResults.playlists && searchResults.playlists.items.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl text-white font-bold mt-8 mb-4">Playlists</h2>
            <div className="relative">
              <button
                id="scroll-left-btn"
                className="absolute left-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(playlistListRef, "left")}
              >
                <MdKeyboardDoubleArrowLeft size={48} />
              </button>
              <ul
                className="overflow-x-hidden overflow-y-none whitespace-nowrap space-x-4"
                ref={playlistListRef}
              >
                {searchResults.playlists.items.map((playlist) => (
                  <li
                    key={playlist.id}
                    className="inline-block text-white rounded-lg shadow-lg w-64 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300 hover:bg-black/40"
                  >
                    <button onClick={() => handlePlay("playlist", playlist?.id)}>
                      <img
                        className="h-64 w-full object-cover"
                        src={playlist.images[0]?.url || ""}
                        alt={playlist.name}
                      />
                      <div className="flex-1 m-4 overflow-hidden">
                        <h3 className="pt-2 text-lg font-bold">
                          {playlist.name.length > 20
                            ? playlist.name.substring(0, 20) + "..."
                            : playlist.name}
                        </h3>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                id="scroll-right-btn"
                className="absolute right-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(playlistListRef, "right")}
              >
                <MdKeyboardDoubleArrowRight size={48} />
              </button>
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default Home;