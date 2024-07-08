import image from '../../assets/Audi.jpeg'


interface Tvehicles {
    id: number;
    name: string;
    type: string;
    color: string;
    image?: string;
}


const Vehicles = () => {

    const vehicles: Tvehicles[] = [
    {
      id: 1,
      name: 'Car',
      type: '4 wheeler',
      color: 'red',
      image: `${image}`
    },
    {
      id: 2,
      name: 'Bike',
      type: '2 wheeler',
      color: 'black',
      image: `${image}`
    },
    {
      id: 3,
      name: 'Truck',
      type: '6 wheeler',
      color: 'blue',
      image: `${image}`
    }
    ]

  return (
    <div className='container py-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-200">
            <h3>{vehicle.name}</h3>
            <p>{vehicle.type}</p>
            <p>{vehicle.color}</p>
            <img src={vehicle.image} alt={vehicle.name} />
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default Vehicles