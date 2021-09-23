import { MouseEventHandler } from "react";
import Button from "../Button/Default";

interface InteractProps {
  onClick: MouseEventHandler;
}

const Interact: React.FC<InteractProps> = ({ onClick }) => (
  <div className="grid items-center h-screen gap-8 md:grid-cols-2">
    <div className="space-y-4">
      <h1 className="text-4xl font-medium">Bu Saatte Çekilir Mi?</h1>

      <div className="p-4 text-gray-400 bg-gray-100 rounded-lg">
        <h1 className="text-lg text-gray-500">Dikkat!</h1>
        <p>Bu projenin mizah dışında hiçbir amacı yoktur.</p>
      </div>

      <Button onClick={onClick}>Başla</Button>
    </div>
  </div>
);

export default Interact;
