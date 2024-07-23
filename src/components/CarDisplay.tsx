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
    model: "Car Model 1",
    description: "Description of Car Model 1",
    price: 25000,
    image: `${porsche}`
  },
  {
    model: "Car Model 2",
    description: "Description of Car Model 2",
    price: 40000,
    image: `${bike1}`
  },
  {
    model: "Car Model 3",
    description: "Description of Car Model 3",
    price: 35000,
    image: `${pickup}`
  },
  {
    model: "Car Model 4",
    description: "Description of Car Model 4",
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
                <p className="text-gray-500 mt-2">Price: ${car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDisplay;
