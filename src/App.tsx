import { useEffect, useRef, useState } from "react";
import "./App.css";

// Import font
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Handles when the user search result is invalid
  // Adds event listener that listens for "not found" message from iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "ZOOM_NOT_FOUND") {
        setNotFound(true);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // User search logic
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    console.log("SEARCH FIRED:", query.trim());
    if (!query.trim()) return;
    setNotFound(false);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "ZOOM_TO", label: query.trim() },
      "*",
    );
  }

  // Reset button logic
  function handleReset() {
    setQuery("");
    setNotFound(false);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "ZOOM_TO", label: "" },
      "*",
    );
  }

  return (
    <div className="container">
      {/*Title*/}
      <h1>Visual Archives</h1>

      {/*Search bar*/}
      <form className="searchBar" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setNotFound(false);
          }}
          placeholder="Search by collection name"
        />
        <button type="button" className="resetButton" onClick={handleReset}>
          Reset
        </button>
      </form>
      {notFound && (
        <p className="searchNotFound">No collection matches "{query}"</p>
      )}

      {/*Import iframe containing the treemap*/}
      <div className="treemapContainer">
        <div className="treemapScroll">
          <iframe
            ref={iframeRef}
            src={`${import.meta.env.BASE_URL}chart.html?v=2`}
            className="treemap"
            title="Treemap"
          />
        </div>
      </div>
    </div>
  );
}
