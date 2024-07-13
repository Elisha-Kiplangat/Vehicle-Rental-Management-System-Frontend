import { FaCar } from 'react-icons/fa';
import { RxStarFilled } from "react-icons/rx"; 
import { IoTime } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface DescriptionItem {
  title: string;
  description: string;
  icon: React.ComponentType; 
}

const DescriptionSection = () => {
  const desc: DescriptionItem[] = [
    {
      title: "Easy Booking Online",
      description: "Our online platform provides you an Easy, Fast and Convenient way to book and reserve your ride!",
      icon: IoIosCheckmarkCircle,
    },
    {
      title: "Professional Service",
      description: "We serve all our clients with utmost courtesy, respect and professionalism. Our drivers are professionally trained on client interaction besides being competent drivers!",
      icon: RxStarFilled,
    },
    {
      title: "Large fleet available",
      description: "We have a large pool of vehicles to choose from to suite your needs",
      icon: FaCar,
    },
    {
      title: "Reliable",
      description: "Our fleet is highly reliable and well maintained to guarantee you a smooth ride throughout your rental time.",
      icon: IoTime,
    },
  ];

  return (
    <div className="bg-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {desc.map((item, index) => (
            <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md flex items-start">
              <div className="w-1/4 flex items-center justify-center text-blue-600">
                <div className="text-6xl">
                  <item.icon />
                </div>
              </div>
              <div className="w-3/4">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
