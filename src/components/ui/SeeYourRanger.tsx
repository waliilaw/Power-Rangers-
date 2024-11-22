import { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader } from "@/components/ui/drawer";

function SeeYourRanger() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [borderColor, setBorderColor] = useState<'red' | 'blue' | 'yellow' | 'green' | 'white'>('white');
  const [rangerName, setRangerName] = useState("Your Ranger Name");

  const setRangerColor = (color: 'red' | 'blue' | 'yellow' | 'green' | 'white') => {
    setBorderColor(color);
    setRangerName(`${color.charAt(0).toUpperCase() + color.slice(1)} Ranger`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <button
        onClick={() => setDrawerOpen(true)}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white text-lg mb-4"
      >
        Open Drawer
      </button>

      {/* Buttons for ranger colors */}
      <div className="flex flex-col items-center space-y-4 mb-4"> {/* Ensuring vertical alignment */}
        <button
          onClick={() => setRangerColor('red')}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white text-lg"
        >
          Red Ranger
        </button>
        <button
          onClick={() => setRangerColor('blue')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg"
        >
          Blue Ranger
        </button>
        <button
          onClick={() => setRangerColor('yellow')}
          className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white text-lg"
        >
          Yellow Ranger
        </button>
        <button
          onClick={() => setRangerColor('green')}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-lg"
        >
          Green Ranger
        </button>
        <button
          onClick={() => setRangerColor('white')}
          className="px-6 py-3 bg-white hover:bg-gray-300 rounded-lg text-black text-lg"
        >
          White Ranger
        </button>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger className="hidden" />
        <DrawerContent
          className={`h-[60vh] bg-black text-white border-4 ${borderColor === 'red' ? 'border-red-600' : 
                     borderColor === 'blue' ? 'border-blue-600' : 
                     borderColor === 'yellow' ? 'border-yellow-600' : 
                     borderColor === 'green' ? 'border-green-600' : 'border-white'}`}
        >
          <DrawerHeader>
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-red-600" />
            <div className="flex flex-col items-center">
              <img
                src="/nero.jpg"
                alt="Sample"
                className="w-full h-[60%] object-cover rounded-md"
              />
              <p className="mt-4 text-lg font-semibold text-center text-white">
                {rangerName}
              </p>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SeeYourRanger;