import Footer from "../components/Footer";
import Nav from "../components/Nav";
import image from "../assets/Hero-bg.jpg";


const About = () => {

const aboutTexts = [
  {
    title: 'Organization Overview',
    content: 'Welcome to SpeedyCar Rentals! We are your trusted partner in providing reliable and affordable car rental services. Whether you need a car for a day, a week, or a month, we have a wide range of vehicles to suit your needs.',
  },
  {
    title: 'Our Mission',
    content: 'Our mission is to make car rental easy and accessible for everyone. We strive to provide high-quality vehicles and exceptional customer service to ensure you have a smooth and enjoyable rental experience.',
  },
  {
    title: 'Our Values',
    content: ['Customer Satisfaction', 'Reliability', 'Transparency', 'Affordability', 'Safety'],
  },
  
  {
    title: 'Our Fleet',
    content: 'We offer a wide selection of vehicles to meet your needs. From compact cars for city driving to SUVs for family trips and luxury vehicles for special occasions, we have the perfect car for every journey. All our vehicles are well-maintained and equipped with the latest features to ensure your comfort and safety.',
  },
  {
    title: 'Our Team',
    content: 'Our team of experienced professionals is here to assist you with all your car rental needs. We take pride in our friendly and knowledgeable staff who are always ready to help you find the right vehicle and provide any assistance you may need during your rental period.',
  }
];

  return (
    <>
      <Nav />
      <div className="about-container w-full h-40 bg-white shadow-lg rounded-lg relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="relative z-1">
        <h1 className="text-2xl font-bold text-black pt-10 rounded-lg flex justify-center">
          About Us
        </h1>
        </div>
        </div>
      {aboutTexts.map((section, index) => (
          <div key={index} className="mt-6 mx-10 rounded-box shadow p-5">
            <h3 className=" font-bold mb-2 text-blue-500 flex justify-center">{section.title}</h3>
            {Array.isArray(section.content) ? (
              <ul className="list-disc list-inside text-lg text-gray-700 ml-4">
                {section.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-700">{section.content}</p>
            )}
          </div>
        ))}
    
      <Footer />
    </>
  );
}

export default About;
