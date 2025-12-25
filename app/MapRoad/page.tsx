"use client";

import { useRouter } from "next/navigation";
import "./MapRoad.css";

export default function MapRoad() {
  const router = useRouter();

  const handleLevelClick = () => {
    router.push("/level/1");
  };

  return (
    <div className="start_menu">
      <div className="map_content">
        <div className="lvl_button" onClick={handleLevelClick}>
          Level 1
        </div>
      </div>
    </div>
  );
}
