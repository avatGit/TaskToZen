import { Circle } from "lucide-react";
import "./TaskItem.css";

export default function TaskItem({ priorityColor, label, category, duration }) {
  return (
    <div className="task-item">
      <div className="task-left-part">
        <Circle color={priorityColor} />
        <p>{label}</p>
        <p>{category}</p>
      </div>
      <p className="task-duration">{duration}</p>
    </div>
  );
}
