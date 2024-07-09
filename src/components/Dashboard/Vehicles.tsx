import { useState } from 'react';
import image from '../../assets/Audi.jpeg';
import CarFilter from './CarFilter'; 


interface Tvehicles {
  id: number;
  name: string;
  type: string;
  color: string;
  location: string;
  image?: string;
}

const Vehicles = () => {
  const [filter, setFilter] = useState({ vehicleType: 'All', location: 'All' });


  const vehicles: Tvehicles[] = [
    {
      id: 1,
      name: 'Car',
      type: '4 wheeler',
      color: 'red',
      location: 'Nairobi',
      image: `${image}`,
    },
    {
      id: 2,
      name: 'Bike',
      type: '2 wheeler',
      color: 'black',
      location: 'Kirinyaga',
      image: `${image}`,
    },
    {
      id: 3,
      name: 'Truck',
      type: '6 wheeler',
      color: 'blue',
      location: 'Mombasa',
      image: `${image}`,
    },
  ];

  const handleFilterChange = (newFilter: { vehicleType: string, location: string }) => {
    setFilter(newFilter);
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (filter.vehicleType === 'All' || vehicle.name === filter.vehicleType) &&
      (filter.location === 'All' || vehicle.location === filter.location) 
  );

  return (

    <>
    <CarFilter onFilterChange={handleFilterChange} />
    <div className="container py-10">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-200"
          >
            <h3>{vehicle.name}</h3>
            <p>{vehicle.type}</p>
            <p>{vehicle.color}</p>
            <p>{vehicle.location}</p>
            <img src={vehicle.image} alt={vehicle.name} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Vehicles;
