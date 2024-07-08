

const CarFilter = () => {
  return (
    <>
        <div className="filters">
            <select className="select select-bordered join-item">
                <option disabled selected>Filter</option>
                <option>Sci-fi</option>
                <option>Drama</option>
                <option>Action</option>
            </select>
        </div> 
    </>
  )
}

export default CarFilter