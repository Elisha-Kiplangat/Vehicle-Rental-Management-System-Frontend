import { FaCar } from 'react-icons/fa'; 

interface DescriptionItem {
  title: string;
  description: string;
  icon: string; 
}

const DescriptionSection = () => {
  const desc: DescriptionItem[] = [
    {
      "title": "Easy Booking Online",
      "description": "Our online platform provides you an Easy, Fast and Convenient way to book and reserve your ride!",
      "icon": "FaCar"
    },
    {
      "title": "Easy Booking Online",
      "description": "Our online platform provides you an Easy, Fast and Convenient way to book and reserve your ride!",
      "icon": "FaCar"
    },
    {
      "title": "Easy Booking Online",
      "description": "Our online platform provides you an Easy, Fast and Convenient way to book and reserve your ride!",
      "icon": "FaCar"
    },
    {
      "title": "Easy Booking Online",
      "description": "Our online platform provides you an Easy, Fast and Convenient way to book and reserve your ride!",
      "icon": "FaCar"
    }
  ];

  return (
    <div className="bg-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {desc.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="icons w-1/2 flex items-center justify-center">
                {item.icon === "FaCar" && <FaCar className="text-5xl text-blue-500 mr-4" />}
              </div>
              <div>
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
