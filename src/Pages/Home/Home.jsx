import FAQ from './FAQ/FAq';
import HowItWorks from './HowItWorks/HowItWorks';
import Jobs from './Jobs/Jobs';

const Home = () => {
    return (
        <div>
            <img src={'https://i.ibb.co/mJCjDGh/banner.png'} alt="" />
            <Jobs></Jobs>
            <FAQ></FAQ>
            <HowItWorks></HowItWorks>

        </div>
    );
};

export default Home;