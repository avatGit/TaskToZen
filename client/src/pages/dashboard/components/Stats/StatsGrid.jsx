import StatsCard from "./StatsCard.jsx";
import { List, CircleCheck, Folder, TrendingUp } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="stats-grid-container">
      <StatsCard value={12} label="Taches en cours" icon={List} />
      <StatsCard
        value={4}
        label="Taches termines aujourd'hui"
        icon={CircleCheck}
      />
      <StatsCard value={3} label="Projets actifs" icon={Folder} />

      <StatsCard
        value={75}
        label="Productivite cette semaine"
        icon={TrendingUp}
      />
    </div>
  );
}
