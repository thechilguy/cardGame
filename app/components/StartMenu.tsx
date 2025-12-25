import Link from "next/link";
import "./StartMenu.css";

export default function StartMenu() {
  return (
    <div className="start_menu">
      <Link href="/MapRoad">
        <button className="start_button">START</button>
      </Link>
      <button className="start_button">MULTIPLAYER</button>
    </div>
  );
}
