import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const MyBids = () => {
    const axios = useAxios();

    const getJobs = async () => {
        const res = await axios.get(`/jobs?category=${category}`);
        return res;
    };

    const { data: jobs, isError, isLoading } = useQuery({
        queryKey: ['jobs', category],
        queryFn: getJobs,
    });

    return (
        <div>

        </div>
    );
};

export default MyBids;