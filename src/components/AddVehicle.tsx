import { useState, useEffect } from 'react';
import { useAddVehicleMutation, useUpdateVehicleMutation, useFetchVehicleSpecsQuery } from '../features/VehiclesAPI';
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

interface EditableVehicleFields {
  rental_rate: number;
  availability: boolean;
  vehicle_specification_id: number;
}

interface AddVehicleProps {
  vehicleToEdit?: TVehicleDetails | null;
  onClose: () => void;
}

interface Tspec {
  vehicle_specification_id: number;
  model: string;
}

const AddVehicle = ({ vehicleToEdit, onClose }: AddVehicleProps) => {
  const initialAddFormData: VehicleSpecs = {
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
  };

  const initialEditFormData: EditableVehicleFields = {
    rental_rate: 0,
    availability: true,
    vehicle_specification_id: 0,
  };

  const [addFormData, setAddFormData] = useState<VehicleSpecs>(initialAddFormData);
  const [editFormData, setEditFormData] = useState<EditableVehicleFields>(initialEditFormData);

  const [addVehicle, { isLoading: isAdding }] = useAddVehicleMutation();
  const [updateVehicle, { isLoading: isUpdating }] = useUpdateVehicleMutation();
  const { data: vehicleSpecs, isLoading: isFetchingSpecs } = useFetchVehicleSpecsQuery();

  useEffect(() => {
    if (vehicleToEdit) {
      setEditFormData({
        rental_rate: vehicleToEdit.rental_rate,
        availability: vehicleToEdit.availability,
        vehicle_specification_id: vehicleToEdit.vehicle_specification_id,
      });
    } else {
      setAddFormData(initialAddFormData);
    }
  }, [vehicleToEdit]);

  const handleAddChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEditChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (vehicleToEdit) {
        const submissionData = {
          rental_rate: editFormData.rental_rate,
          availability: editFormData.availability.toString(),
          vehicle_specification_id: editFormData.vehicle_specification_id,
        };
        await updateVehicle({ vehicle_id: vehicleToEdit.vehicle_id, vehicle: submissionData }).unwrap();
        console.log('Vehicle updated successfully');
      } else {
        const submissionData = {
          ...addFormData,
          availability: addFormData.availability.toString(),
        };
        await addVehicle(submissionData).unwrap();
        console.log('Vehicle added successfully');
      }

      setAddFormData(initialAddFormData);
      onClose();
    } catch (error) {
      console.error('Failed to save vehicle: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-200 shadow-md rounded">
      {vehicleToEdit ? (
        <>
          <div className="mb-4">
            <label htmlFor="rental_rate" className="block text-gray-700">Rental Rate</label>
            <input
              type="number"
              name="rental_rate"
              value={editFormData.rental_rate}
              onChange={handleEditChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="availability" className="block text-gray-700">Availability</label>
            <input
              type="checkbox"
              name="availability"
              checked={editFormData.availability}
              onChange={handleEditChange}
              className="mt-1 block"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="vehicle_specification_id" className="block text-gray-700">Vehicle Specification ID</label>
            <select
              name="vehicle_specification_id"
              value={editFormData.vehicle_specification_id}
              onChange={handleEditChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>Select Specification</option>
              {!isFetchingSpecs && vehicleSpecs?.map((spec: Tspec) => (
                <option key={spec.vehicle_specification_id} value={spec.vehicle_specification_id}>
                  {spec.vehicle_specification_id} - {spec.model}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="vehicle_type" className="block text-gray-700">Vehicle Type</label>
            <select
              name="vehicle_type"
              value={addFormData.vehicle_type}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>Select</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="manufacturer" className="block text-gray-700">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={addFormData.manufacturer}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="model" className="block text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={addFormData.model}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={addFormData.year}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fuel_type" className="block text-gray-700">Fuel Type</label>
            <input
              type="text"
              name="fuel_type"
              value={addFormData.fuel_type}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="engine_capacity" className="block text-gray-700">Engine Capacity</label>
            <input
              type="text"
              name="engine_capacity"
              value={addFormData.engine_capacity}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="transmission" className="block text-gray-700">Transmission</label>
            <input
              type="text"
              name="transmission"
              value={addFormData.transmission}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="seating_capacity" className="block text-gray-700">Seating Capacity</label>
            <input
              type="number"
              name="seating_capacity"
              value={addFormData.seating_capacity}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="color" className="block text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={addFormData.color}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="features" className="block text-gray-700">Features</label>
            <input
              type="text"
              name="features"
              value={addFormData.features}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rental_rate" className="block text-gray-700">Rental Rate</label>
            <input
              type="number"
              name="rental_rate"
              value={addFormData.rental_rate}
              onChange={handleAddChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="availability" className="block text-gray-700">Availability</label>
            <input
              type="checkbox"
              name="availability"
              checked={addFormData.availability}
              onChange={handleAddChange}
              className="mt-1 block"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        disabled={isAdding || isUpdating}
      >
        {vehicleToEdit ? 'Update Vehicle' : 'Add Vehicle'}
      </button>
    </form>
  );
};

export default AddVehicle;
