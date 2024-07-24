
import Audi from '../../assets/Audi.jpeg'
import Mazda from '../../assets/Mazda.jpg'
import Benz from '../../assets/Benz.jpg'
import bike1 from '../../assets/bike1.jpg'
import bike2 from '../../assets/bike1.jpg'
import bike3 from '../../assets/bike3.jpg'
import Cybertruck from '../../assets/Cybertruck.jpg'
import isuzu from '../../assets/isuzu.jpg'
import IsuzuPickup from '../../assets/isuzu-pickup.jpg'
import pickup from '../../assets/pickup.jpg'
import Canter from '../../assets/canter.jpg'
import forrdPickup from '../../assets/forrd-pickup.jpg'
import Porsche from '../../assets/porsche.jpg'
import Fielder from '../../assets/Fielder.jpg'

const vehicleImages: { [key: string]: string } = {
  'Audi': `${Audi}`,
  'Honda': `${bike1}`,
  'Tvs': `${bike2}`,
  'Yamaha': `${bike3}`,
  'Mercedes': `${Benz}`,
  'Cybertruck': `${Cybertruck}`,
  'Honda c3': `${bike2}`,
  'Mazda': `${Mazda}`,
  'Isuzu': `${isuzu}`,
  'Isuzu-pickup': `${IsuzuPickup}`,
  'Toyota-pickup': `${pickup}`,
  'Canter': `${Canter}`,
  'Ford': `${forrdPickup}`,
  'Fielder': `${Fielder}`,
  'Porsche': `${Porsche}`,
  
};

interface VehicleDetailsProps {
  vehicle: {
    vehicle_id: number;
    rental_rate: number;
    availability: boolean;
    vehicle_spec: {
      vehicle_type: string;
      model: string;
      fuel_type: string | null;
      seating_capacity: number;
    };
    image?: string;
  };
  onRent: (vehicle: any) => void; 
  onBack: () => void;
}

const VehicleDetails = ({ vehicle, onRent, onBack }: VehicleDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-1/2 p-4">
          <img src={vehicleImages[vehicle.vehicle_spec.model] || `${Audi}`} alt={vehicle.vehicle_spec.model} className="w-full h-auto rounded-lg shadow-md" />
                
          {/* <img
            src={image}
            alt={vehicle.vehicle_spec.model}
            className="w-full h-auto rounded-lg shadow-md"
          /> */}
        </div>
        <div className="w-full lg:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {vehicle.vehicle_spec.vehicle_type}: <i>{vehicle.vehicle_spec.model}</i>
            </h2>
            <p className="mb-2">
              <strong>Fuel Type:</strong> {vehicle.vehicle_spec.fuel_type || 'Unknown'}
            </p>
            <p className="mb-2">
              <strong>Seating Capacity:</strong> {vehicle.vehicle_spec.seating_capacity}
            </p>
            <p className="mb-2">
              <strong>Rental Rate:</strong> ${vehicle.rental_rate} per day
            </p>
            <p className="mb-4">
              <strong>Availability:</strong> {vehicle.availability ? 'Available' : 'Not Available'}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className={`font-bold py-2 px-4 rounded-lg ${
                vehicle.availability
                  ? 'bg-blue-500 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={() => onRent(vehicle)}
              disabled={!vehicle.availability}
            >
              Rent Now
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={onBack}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
