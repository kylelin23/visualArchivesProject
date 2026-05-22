import { useEffect } from "react";
import "./App.css";
import Papa from "papaparse";

export default function App() {
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "data.csv")
      .then(res => res.text())
      .then(text => {
        const result = Papa.parse(text, { header: true });
        const titles = result.data
          .map((row: string) => row["Title"])
          .filter((title: string) => title && title.trim() !== "");
        const uniqueTitles = [...new Set(titles)];
        console.log(uniqueTitles);
      });
  }, []);

  return (
    <div className="container">
      <h1>Treemap</h1>
      <iframe
        src={`${import.meta.env.BASE_URL}chart.html`}
        width="100%"
        height="600px"
        style={{ border: "none" }}
      />
    </div>
  );
}