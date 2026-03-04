
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
import Vitz from '../../assets/Vitz.jpg'
import Purosangue from '../../assets/Purosangue.jpg'
import TX from '../../assets/TX.jpg'
import V8 from '../../assets/V8.jpg'
import Skyline from '../../assets/Skyline.jpg'
import Impreza from '../../assets/Impreza.jpg'
import CX5 from '../../assets/CX5.jpg'

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
  'Vitz': `${Vitz}`,
  'Purosangue': `${Purosangue}`,
  'TX': `${TX}`,
  'V8': `${V8}`,
  'Skyline': `${Skyline}`,
  'Impreza': `${Impreza}`,
  'CX5': `${CX5}`,


  
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
    <div className="max-w-5xl mx-auto mt-10 mb-10 bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="flex flex-wrap lg:flex-nowrap">
       
        <div className="w-full lg:w-1/2 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img 
              src={vehicleImages[vehicle.vehicle_spec.model] || `${Audi}`} 
              alt={vehicle.vehicle_spec.model} 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold text-sm shadow-lg ${
              vehicle.availability 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {vehicle.availability ? '✓ Available' : '✗ Not Available'}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                {vehicle.vehicle_spec.vehicle_type}
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {vehicle.vehicle_spec.model}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>

            <div className="space-y-4 mb-6">
             
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Fuel Type</p>
                  <p className="text-gray-800 font-semibold">{vehicle.vehicle_spec.fuel_type || 'Unknown'}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Seating Capacity</p>
                  <p className="text-gray-800 font-semibold">{vehicle.vehicle_spec.seating_capacity} Passengers</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-blue-700 font-medium">Rental Rate</p>
                  <p className="text-2xl text-blue-900 font-bold">{vehicle.rental_rate}<span className="text-sm font-normal text-gray-600">/day</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className={`flex-1 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                vehicle.availability
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
              }`}
              onClick={() => onRent(vehicle)}
              disabled={!vehicle.availability}
            >
              {vehicle.availability ? ' Rent Now' : 'Not Available'}
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
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
