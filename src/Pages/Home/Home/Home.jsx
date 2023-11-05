import { Helmet } from 'react-helmet';
import FAQ from '../FAQ/FAQ';
import HowItWorks from '../HowItWorks/HowItWorks';
import Jobs from '../Jobs/Jobs';

const Home = () => {
    const websiteName = 'Job Shop || Home';

    return (
        <div>
            <Helmet>
                <title>{websiteName}</title>
                <link rel="icon" type="image/png" href="../../../../public/job-icon.png" />
            </Helmet>

            <img src={'https://i.ibb.co/mJCjDGh/banner.png'} alt="" />
            <Jobs></Jobs>
            <FAQ></FAQ>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;
