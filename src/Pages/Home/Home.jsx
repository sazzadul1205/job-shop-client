import { useQuery } from '@tanstack/react-query'
import useAxios from '../../Hooks/useAxios'
import Jobs from './Jobs/Jobs';

const Home = () => {
    const axios = useAxios()
    // const [jobs, setJobs] = useState([]);


    const getJobs = async () =>{
        const res = await axios.get('/jobs')
        return res;
    }

const {data: jobs, isError, isLoading} = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
})
    console.log(jobs.data);


    return (
        <div>
            {/* banneer */}
            <div>
                <img src={'https://i.ibb.co/mJCjDGh/banner.png'} alt="" />
            </div>
            {/* jobs */}
            <div>
                <Jobs jobs={jobs.data}></Jobs>
            </div>
        </div>
    );
};

export default Home;