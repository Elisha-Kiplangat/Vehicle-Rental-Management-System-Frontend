import Footer from "../components/Footer";
import Nav from "../components/Nav";


const About = () => {
  return (
    <>
      <Nav />
      <div className="about-container p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
      <p className="text-lg mb-6 text-gray-700">
        Welcome to SpeedyCar Rentals! We are your trusted partner in providing reliable and affordable car rental services. 
        Whether you need a car for a day, a week, or a month, we have a wide range of vehicles to suit your needs.
      </p>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Mission</h2>
      <p className="text-lg mb-6 text-gray-700">
        Our mission is to make car rental easy and accessible for everyone. We strive to provide high-quality vehicles and exceptional customer service 
        to ensure you have a smooth and enjoyable rental experience.
      </p>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Values</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li className="text-lg">Customer Satisfaction</li>
        <li className="text-lg">Reliability</li>
        <li className="text-lg">Transparency</li>
        <li className="text-lg">Affordability</li>
        <li className="text-lg">Safety</li>
      </ul>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our History</h2>
      <p className="text-lg mb-6 text-gray-700">
        Established in 2010, SpeedyCar Rentals started with a small fleet of vehicles and a commitment to customer satisfaction. Over the years, we have grown 
        to become a leading car rental company with a diverse range of vehicles and a loyal customer base. Our success is built on our dedication to providing 
        quality service and maintaining the highest standards in the industry.
      </p>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Fleet</h2>
      <p className="text-lg mb-6 text-gray-700">
        We offer a wide selection of vehicles to meet your needs. From compact cars for city driving to SUVs for family trips and luxury vehicles for special occasions, 
        we have the perfect car for every journey. All our vehicles are well-maintained and equipped with the latest features to ensure your comfort and safety.
      </p>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Team</h2>
      <p className="text-lg mb-6 text-gray-700">
        Our team of experienced professionals is here to assist you with all your car rental needs. We take pride in our friendly and knowledgeable staff who are always 
        ready to help you find the right vehicle and provide any assistance you may need during your rental period.
      </p>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Contact Us</h2>
      <p className="text-lg mb-6 text-gray-700">
        Have any questions or need assistance? Feel free to contact us at <a href="mailto:support@speedycarrentals.com" className="text-blue-500">support@speedycarrentals.com</a> or call us at <a href="tel:123-456-7890" className="text-blue-500">(123) 456-7890</a>. 
        We are here to help you with all your car rental needs.
      </p>
    </div>
      <Footer />
    </>
  );
}

export default About;
