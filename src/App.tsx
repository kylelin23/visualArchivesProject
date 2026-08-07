import "./App.css";

const departments = [
  {
    name: "Department",
    count: 1,
    sum: 57.0,
    mean: 57.0,
    median: 57.0,
    max: 57.0,
  },
  {
    name: "MS",
    count: 124,
    sum: 10929.5,
    mean: 88.14,
    median: 13.0,
    max: 1018.5,
  },
  {
    name: "UA",
    count: 60,
    sum: 15514.0,
    mean: 258.57,
    median: 70.75,
    max: 5833.5,
  },
  { name: "Unknown", count: 1, sum: 5.0, mean: 5.0, median: 5.0, max: 5.0 },
];

export default function App() {
  const handleRowClick = (department) => {
    localStorage.setItem("selectedDepartment", department.name);
    window.location.href = `/department/${department.name}`;
  };

  return (
    <div>
      <h1>Archives Visualization</h1>

      <iframe
        src={`${import.meta.env.BASE_URL}chart.html?v=2`}
        className="treemap"
        title="Treemap"
      />

      <div className="stats">
        <h2>Summary by Department</h2>

        <table>
          <thead>
            <tr>
              <th>MS/UA/Dept</th>
              <th>Count</th>
              <th>Sum</th>
              <th>Mean</th>
              <th>Median</th>
              <th>Max</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department, index) => (
              <tr key={index} onClick={() => handleRowClick(department)}>
                <td>{department.name}</td>
                <td>{department.count}</td>
                <td>{department.sum}</td>
                <td>{department.mean}</td>
                <td>{department.median}</td>
                <td>{department.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
