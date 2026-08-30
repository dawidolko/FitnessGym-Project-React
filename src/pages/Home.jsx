import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import MainBackground from "../components/MainBackground/MainBackground";
import Fitness from "../components/Fitness/Fitness";
import FixedBg from "../components/FixedBg/FixedBg";
import Pricing from "../components/Pricing/Pricing";
import Counter from "../components/Counter/Counter";
import Team from "../components/Team/Team";
import Testimonials from "../components/Testimonials/Testimonials";
import CallBack from "../components/CallBack/CallBack";
import LogoSlider from "../components/LogoSlider/LogoSlider";
import NewProducts from "../components/NewProducts/NewProducts";

const Home = () => {
  return (
    <AnimatedPage>
      <MainBackground />
      {/* Skip-link target: the first real content after the hero banner. */}
      <div id="main-start" tabIndex={-1}>
        <Fitness />
      </div>
      <FixedBg
        cName="fixed"
        text="WHATEVER YOUR MOOD IS…"
        title="… We’ve got a Fitness Class tailored for you!"
      />
      <NewProducts />
      <Counter />
      <Team />
      <FixedBg
        cName="fixed__secondary"
        text="Welcome To FitnessGym…"
        title="… Your ultimate partner for achieving fitness goals"
      />
      <Pricing />
      <Testimonials />
      <LogoSlider />
      <CallBack />
    </AnimatedPage>
  );
};

export default Home;
