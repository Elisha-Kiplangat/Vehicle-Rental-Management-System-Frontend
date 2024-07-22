import { useState, useEffect } from 'react';
import { useAddVehicleMutation, useUpdateVehicleMutation } from '../features/VehiclesAPI';
import { TVehicleDetails } from '../features/VehiclesAPI';

interface VehicleSpecs {
  vehicle_type: string;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
  rental_rate: number;
  availability: boolean;
}

interface AddVehicleProps {
  vehicleToEdit?: TVehicleDetails | null;
  onClose: () => void;
}

const AddVehicle = ({ vehicleToEdit, onClose }: AddVehicleProps) => {
  const [formData, setFormData] = useState<VehicleSpecs>({
    vehicle_type: '',
    manufacturer: '',
    model: '',
    year: 2020,
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: 0,
    color: '',
    features: '',
    rental_rate: 0,
    availability: true,
  });

  const [addVehicle, { isLoading: isAdding }] = useAddVehicleMutation();
  const [updateVehicle, { isLoading: isUpdating }] = useUpdateVehicleMutation();

  useEffect(() => {
    if (vehicleToEdit) {
      setFormData({
        vehicle_type: vehicleToEdit.vehicle_spec.vehicle_type,
        manufacturer: vehicleToEdit.vehicle_spec.manufacturer,
        model: vehicleToEdit.vehicle_spec.model,
        year: vehicleToEdit.vehicle_spec.year,
        fuel_type: vehicleToEdit.vehicle_spec.fuel_type,
        engine_capacity: vehicleToEdit.vehicle_spec.engine_capacity,
        transmission: vehicleToEdit.vehicle_spec.transmission,
        seating_capacity: vehicleToEdit.vehicle_spec.seating_capacity,
        color: vehicleToEdit.vehicle_spec.color,
        features: vehicleToEdit.vehicle_spec.features,
        rental_rate: vehicleToEdit.rental_rate,
        availability: vehicleToEdit.availability,
      });
    } else {
      setFormData({
        vehicle_type: '',
        manufacturer: '',
        model: '',
        year: 2020,
        fuel_type: '',
        engine_capacity: '',
        transmission: '',
        seating_capacity: 0,
        color: '',
        features: '',
        rental_rate: 0,
        availability: true,
      });
    }
  }, [vehicleToEdit]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (vehicleToEdit) {
        const submissionData = {
      ...formData,
      availability: formData.availability.toString(),
    };
        await updateVehicle({ vehicle_id: vehicleToEdit.vehicle_id, vehicle: submissionData }).unwrap();
        console.log('Vehicle updated successfully');
      } else {
        const submissionData = {
          ...formData,
          availability: formData.availability.toString(),
        };
        await addVehicle(submissionData).unwrap();
        console.log('Vehicle added successfully');
      }

      setFormData({
        vehicle_type: '',
        manufacturer: '',
        model: '',
        year: 2020,
        fuel_type: '',
        engine_capacity: '',
        transmission: '',
        seating_capacity: 0,
        color: '',
        features: '',
        rental_rate: 0,
        availability: true,
      });
      onClose();
    } catch (error) {
      console.error('Failed to save vehicle: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-200 shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="vehicle_type" className="block text-gray-700">Vehicle Type</label>
        <select
          name="vehicle_type"
          value={formData.vehicle_type}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="" disabled>Select</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="manufacturer" className="block text-gray-700">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="model" className="block text-gray-700">Model</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-gray-700">Year</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fuel_type" className="block text-gray-700">Fuel Type</label>
        <input
          type="text"
          name="fuel_type"
          value={formData.fuel_type}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="engine_capacity" className="block text-gray-700">Engine Capacity</label>
        <input
          type="text"
          name="engine_capacity"
          value={formData.engine_capacity}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="transmission" className="block text-gray-700">Transmission</label>
        <input
          type="text"
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="seating_capacity" className="block text-gray-700">Seating Capacity</label>
        <input
          type="number"
          name="seating_capacity"
          value={formData.seating_capacity}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="color" className="block text-gray-700">Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="features" className="block text-gray-700">Features</label>
        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rental_rate" className="block text-gray-700">Rental Rate</label>
        <input
          type="number"
          name="rental_rate"
          value={formData.rental_rate}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="availability" className="block text-gray-700">Availability</label>
        <input
          type="checkbox"
          name="availability"
          checked={formData.availability}
          onChange={handleChange}
          className="mt-1 block"
        />
      </div>

      <div className="mb-4">
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-md" disabled={isAdding || isUpdating}>
          {isAdding || isUpdating ? (vehicleToEdit ? 'Updating...' : 'Adding...') : (vehicleToEdit ? 'Update Vehicle' : 'Add Vehicle')}
        </button>
      </div>
    </form>
  );
};

export default AddVehicle;
