

interface VehicleDetailsProps {
  vehicle: {
    name: string;
    type: string;
    color: string;
    location: string;
    image?: string;
    description?: string;
  };
  onRent: (vehicle: any) => void; 
  onBack: () => void;
}

const VehicleDetails = ({ vehicle, onRent, onBack }: VehicleDetailsProps) => {
  return (
    <div className="max-w-1/2 mx-auto mt-10 bg-white rounded-lg overflow-hidden shadow-md flex justify-center items-center">
      <div className="flex justify-between items-center">
        <div className="w-1/2 p-4">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="w-1/2 p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">{vehicle.name}</h2>
          <p>
            <strong>Type:</strong> {vehicle.type}
          </p>
          <p>
            <strong>Color:</strong> {vehicle.color}
          </p>
          <p>
            <strong>Location:</strong> {vehicle.location}
          </p>
          <div className="mt-4">
            {vehicle.description && (
              <>
                <p className="text-gray-700 mb-2"><strong>Description:</strong></p>
                <p className="text-gray-700">{vehicle.description}</p>
              </>
            )}
          </div>
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
