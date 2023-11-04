import { useQuery } from '@tanstack/react-query'
import useAxios from '../../Hooks/useAxios'

const Home = () => {
    const axios = useAxios()


    const getJobs = async () =>{
        const res = await axios.get('/jobs');
        return res;
    }

    // const {
    //     data: jobs,
    //     isLoading,
    //     isError,
    //     error,
    // } = useQuery({
    //     queryKey: ['jobs'],
    //     queryFn: getjobs
    // })
    
    const jobs = getJobs()
    console.log(jobs.object);

    return (
        <div>
            {/* banneer */}
            <div>
                <img src={'https://i.ibb.co/mJCjDGh/banner.png'} alt="" />
            </div>
            {/* jobs */}
            <div>
                {/* <h1>jobs</h1>
                <button onClick={getJobs} className='btn btn-primary' ></button>
                {
                    jobs?.data.map(jobs => <h1 key={jobs.id}>{jobs}</h1>)
                } */}

            </div>
        </div>
    );
};

export default Home;