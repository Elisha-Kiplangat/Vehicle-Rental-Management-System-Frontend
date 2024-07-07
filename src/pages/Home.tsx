import CarDisplay from "../components/CarDisplay"
import DescriptionSection from "../components/DescriptionSection"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Nav from "../components/Nav"

const Home = () => {
  return (
    <>
        <Nav />
        <Hero />
        <DescriptionSection />
        <CarDisplay />
        <Footer />
    </>
  )
}

export default Home