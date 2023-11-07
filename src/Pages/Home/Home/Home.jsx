import { Helmet } from 'react-helmet';
import FAQ from '../FAQ/FAQ';
import HowItWorks from '../HowItWorks/HowItWorks';
import Jobs from '../Jobs/Jobs';
import { motion, useScroll } from "framer-motion"

const Home = () => {
    const websiteName = 'Job Shop || Home';
    const { scrollYProgress } = useScroll();


    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-2 bg-red-500"
                style={{ originX: 0, scaleX: scrollYProgress }}
            />

            <div>
                <Helmet>
                    <title>{websiteName}</title>
                    <link rel="icon" type="image/png" href={'https://i.ibb.co/sC0GGzS/job-icon.png'} />
                </Helmet>
                <img src={'https://i.ibb.co/mJCjDGh/banner.png'} alt="" />
                <Jobs />
                <FAQ />
                <HowItWorks />

            </div>
        </>
    );
};

export default Home;
