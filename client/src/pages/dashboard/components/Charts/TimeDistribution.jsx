import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Travail", value: 40, hours: 8, colorClass: "dot-red" },
  { name: "Apprentissage", value: 30, hours: 6, colorClass: "dot-orange" },
  { name: "Révision", value: 20, hours: 4, colorClass: "dot-green" },
  { name: "Autre", value: 10, hours: 2, colorClass: "dot-gray" },
];
const COLORS = ["red", "#cfaa5a", "#4acd7e", "gray"];

export default function TimeDistribution() {
  const totalHours = data.reduce(
    (accumulator, item) => accumulator + item.hours,
    0,
  );
  return (
    <div className="time-distribution-container">
      <h2 style={{ margin: "0" }}>Repartition du temps</h2>

      <div className="widget-body">
        <div className="chart">
          <PieChart width={150} height={150}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={"70%"}
              outerRadius={"100%"}
              dataKey="value"
              /* label={(entry) => entry.name} */
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
           
            <Tooltip />
          </PieChart>
           <div className="chart-center-text">
    <span>{totalHours}h</span>
  </div>
        </div>
        <div className="categories">
          {data.map((item) => (
            <div className="category-item" key={item.name}>
              <div className="category-left">
                <span className={`status-dot ${item.colorClass}`}></span>
                <p className="category-name">{item.name}</p>
              </div>
              <div className="category-right">
                <span className="category-hours">{item.hours}h</span>
                <span className="category-precentage">({item.value}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="widget-footer">
        <button className="view-all-btn">Voir plus de statistiques</button>
      </div>
    </div>
  );
}
