import SearchBar from "./SearchBar";
import ViewModeToggle from "../ModeToggle/ViewModeToggle";
import NotificationBell from "../../../../components/NotificationBell";
import UserAvatar from "./UserAvatar";

export default function TaskHeader({
  currentMode,
  onModeChange,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="task-header">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="header-right">
        <ViewModeToggle currentMode={currentMode} onModeChange={onModeChange} />
        <NotificationBell />
        <UserAvatar />
      </div>
    </div>
  );
}
