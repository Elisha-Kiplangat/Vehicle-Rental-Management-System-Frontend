import image from '../../assets/Audi.jpeg'


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
    <div className="max-w-1/2 mx-auto mt-10 bg-white rounded-lg overflow-hidden shadow-md">
      <div className="flex justify-around items-center">
        <div className="w-1/2 p-4">
          <img
            src={image}
            alt={vehicle.vehicle_spec.model}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="w-1/2 p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">{vehicle.vehicle_spec.vehicle_type}:<i>{vehicle.vehicle_spec.model}</i></h2>
          <p>
            <strong>Fuel Type:</strong> {vehicle.vehicle_spec.fuel_type || 'Unknown'}
          </p>
          <p>
            <strong>Seating Capacity:</strong> {vehicle.vehicle_spec.seating_capacity}
          </p>
          <p>
            <strong>Rental Rate:</strong> ${vehicle.rental_rate} per day
          </p>
          <p>
            <strong>Availability:</strong> {vehicle.availability ? 'Available' : 'Not Available'}
          </p>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onRent(vehicle)}
            >
              Rent Now
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
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
