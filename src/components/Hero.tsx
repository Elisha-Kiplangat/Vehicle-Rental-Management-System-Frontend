import heroBg from '../assets/Hero-bg.jpg'

const Hero = () => {
  return (
    <div
    className="hero bg-cover bg-bottom"
      style={{
        height: '70vh',
        backgroundImage: `url(${heroBg})`,
      }}>
    
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">NEED A PERSONAL DRIVE OR RIDE!</h1>
      <p className="mb-5">
        Checkout now to rent a vehicle for your travels
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>

  )
}

export default Hero