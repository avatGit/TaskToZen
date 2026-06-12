import "./StatsCard.css";

export default function StatsCard({ value, label, icon: Icon }) {
  return (
    <div className="card-item">
      <div className="card-value-icon">
        <h4 className="card-value">{value}</h4>
        <Icon className="card-icon" />
      </div>
      <div className="card-title">
        <p>{label}</p>
      </div>
    </div>
  );
}
