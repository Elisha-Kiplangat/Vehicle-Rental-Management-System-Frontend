import porsche from '../assets/porsche.jpg'
import bike1 from '../assets/bike2.jpg'
import  canter from '../assets/canter.jpg'
import pickup from '../assets/pickup.jpg'

interface Car {
  model: string;
  description: string;
  price: number;
  image: string;
}

const cars: Car[] = [
  {
    model: "Porsche Cayenne",
    description: "The Porsche Cayenne is a luxury mid-size SUV that combines performance, style, and versatility. It features a powerful engine lineup, advanced technology, and a comfortable interior, making it an ideal choice for those seeking a high-performance SUV with a touch of elegance.",
    price: 25000,
    image: `${porsche}`
  },
  {
    model: "Electric Bike",
    description: "The electric bike is a modern, eco-friendly transportation option that combines the convenience of cycling with the power of electric motors. It offers an efficient and sustainable way to travel short to medium distances.",
    price: 40000,
    image: `${bike1}`
  },
  {
    model: "Pickup Truck",
    description: "The Pickup Truck is a rugged and versatile vehicle designed for both work and leisure. It offers a spacious cargo bed, powerful towing capabilities, and a comfortable interior, making it an ideal choice for those who need a reliable vehicle for hauling goods or embarking on outdoor adventures.",
    price: 35000,
    image: `${pickup}`
  },
  {
    model: "Lorry",
    description: "The Lorry is a versatile and robust vehicle designed for transporting goods and materials. It offers excellent cargo capacity, durability, and reliability for both urban and rural transportation needs.",
    price: 40000,
    image: `${canter}`
  }
];

const CarDisplay = () => {
  return (
    <div className="py-10 bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars.map((car, index) => (
            <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-md">
              <img className="w-full h-48 object-cover object-center" src={car.image} alt={car.model} />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{car.model}</h2>
                <p className="text-gray-700">{car.description}</p>
                <p className="text-gray-500 mt-2">Price: Ksh.{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDisplay;
