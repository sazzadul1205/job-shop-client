import JobCard from "./JobCard";

const Jobs = (jobs) => {

    console.log(jobs.jobs);

    return (

        <div className="bg-[#205295]">
            <div className="text-center pt-5">
                <h1 className="text-5xl font-bold">Available Jobs</h1>
                <p className="text-xl font-semibold">Pick one to get started!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
                {
                    jobs?.jobs.map(job => <JobCard key={job._id} job={job}></JobCard>)
                }
            </div>
        </div>
    );
};

export default Jobs;