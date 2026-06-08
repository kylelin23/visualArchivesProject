import "./App.css";

export default function App() {

  return (
    <div className="container">
      <h1>Archives Visualization</h1>
      <div className = "treemapContainer">
         <iframe
            src={`${import.meta.env.BASE_URL}chart.html?v=2`}
            className="treemap"
            title="Treemap"
          />
      </div>


      <div className="stats">
        <h2>Overall Linear Feet Summary Statistics</h2>
        <table>
          <tbody>
            <tr><td>Collection count</td><td>186</td></tr>
            <tr><td>Mean</td><td>142.50</td></tr>
            <tr><td>Std</td><td>473.32</td></tr>
            <tr><td>Min</td><td>2.50</td></tr>
            <tr><td>25%</td><td>5.00</td></tr>
            <tr><td>50%</td><td>25.25</td></tr>
            <tr><td>75%</td><td>100.38</td></tr>
            <tr><td>Max</td><td>5833.50</td></tr>
          </tbody>
        </table>

        <h2>Summary by Department</h2>
        <table>
          <thead>
            <tr><th>MS/UA/Dept</th><th>Count</th><th>Sum</th><th>Mean</th><th>Median</th><th>Max</th></tr>
          </thead>
          <tbody>
            <tr><td>Department</td><td>1</td><td>57.0</td><td>57.00</td><td>57.00</td><td>57.0</td></tr>
            <tr><td>MS</td><td>124</td><td>10929.5</td><td>88.14</td><td>13.00</td><td>1018.5</td></tr>
            <tr><td>UA</td><td>60</td><td>15514.0</td><td>258.57</td><td>70.75</td><td>5833.5</td></tr>
            <tr><td>Unknown</td><td>1</td><td>5.0</td><td>5.00</td><td>5.00</td><td>5.0</td></tr>
          </tbody>
        </table>

        <h2>Top 10 Largest Collections</h2>
        <table>
          <thead>
            <tr><th>MS/UA/Dept</th><th>Collection No.</th><th>Title</th><th>Linear Feet</th></tr>
          </thead>
          <tbody>
            <tr><td>UA</td><td>UA</td><td>Unknown</td><td>2507.0</td></tr>
            <tr><td>UA</td><td>UA0015</td><td>Records of the Athletics Department</td><td>1477.5</td></tr>
            <tr><td>MS</td><td>MS0195</td><td>Mothers for Peace Collection</td><td>1018.5</td></tr>
            <tr><td>MS</td><td>MS0210</td><td>Diablo Canyon Nuclear Power Plant Public Docum</td><td>1001.0</td></tr>
            <tr><td>UA</td><td>UA0099</td><td>University Archives Photograph Collection</td><td>978.0</td></tr>
            <tr><td>MS</td><td>MS0009</td><td>California Fairs Collection</td><td>950.0</td></tr>
            <tr><td>UA</td><td>UA0033</td><td>The Associated Students, Inc. (ASI)</td><td>882.5</td></tr>
            <tr><td>MS</td><td>MS0015</td><td>Richard J. Krejsa Collection</td><td>733.0</td></tr>
            <tr><td>UA</td><td>UA0008</td><td>Office of the President, Julian A. McPhee</td><td>724.5</td></tr>
            <tr><td>MS</td><td>MS0003</td><td>Arthur G. Barton Landscape Architecture</td><td>514.0</td></tr>
          </tbody>
        </table>

        <h2>Linear Feet by Department</h2>
        <table>
          <tbody>
            <tr><td>Department</td><td>26.0</td></tr>
            <tr><td>MS</td><td>10762.0</td></tr>
            <tr><td>UA</td><td>12403.0</td></tr>
            <tr><td>Unknown</td><td>5.0</td></tr>
          </tbody>
        </table>

        <div className="counts">
          <p>MS Containers: 1374</p>
          <p>UA Containers: 2001</p>
        </div>
      </div>
    </div>
  );
}