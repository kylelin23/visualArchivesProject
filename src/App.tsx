import { useEffect, useRef, useState } from "react";
import "./App.css";

// Import font
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "LABELS") {
        setLabels(event.data.labels || []);
      }
      if (event.data?.type === "ZOOM_NOT_FOUND") {
        setNotFound(true);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions =
    query.trim().length > 0
      ? labels
          .filter((label) =>
            label.toLowerCase().includes(query.trim().toLowerCase()),
          )
          .slice(0, 8)
      : [];

  function zoomTo(label: string) {
    setNotFound(false);
    setShowSuggestions(false);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "ZOOM_TO", label },
      "*",
    );
  }

  // User search logic
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    zoomTo(query.trim());
  }

  // Clicking on preview suggestion
  function handleSuggestionClick(label: string) {
    setQuery(label);
    zoomTo(label);
  }

  // Reset button logic
  function handleReset() {
    setQuery("");
    setNotFound(false);
    setShowSuggestions(false);
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
      <div className="searchBarWrapper" ref={searchBarRef}>
        <form className="searchBar" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setNotFound(false);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search by collection name"
            autoComplete="off"
          />
          <button type="button" className="resetButton" onClick={handleReset}>
            Reset
          </button>
        </form>

        {/*Preview*/}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestionsList">
            {suggestions.map((label) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(label)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/*Error message*/}
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
