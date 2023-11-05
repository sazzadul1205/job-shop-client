import useAxios from "../../Hooks/useAxios";

const MyJobs = () => {

    const axios = useAxios();
    
    const getJobs = async () => {
        const res = await axios.get(`/jobs?category=${category}`);
        return res;
    };


    return (
        <div className="bg-[#2C74B3]">
            <h1 className="text-center text-3xl font bold">MyJobs</h1>

        </div>
    );
};

export default MyJobs;