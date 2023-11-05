import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useQuery } from '@tanstack/react-query';
import JobCard from "./JobCard";
import useAxios from '../../../Hooks/useAxios';
import Loader from "../../../Loader/Loader";

const Jobs = () => {
    const axios = useAxios();
    const [category, setCategory] = useState('Web-Development');

    const handleWDCategory = () => {
        setCategory('Web-Development');
    };
    const handleDMCategory = () => {
        setCategory('Digital-Marketing');
    };
    const handleGDCategory = () => {
        setCategory('Graphics-Design');
    };

    const getJobs = async () => {
        const res = await axios.get(`/jobs?category=${category}`);
        return res;
    };

    const { data: jobs, isError, isLoading } = useQuery({
        queryKey: ['jobs', category],
        queryFn: getJobs,
    });

    if (isLoading) {
        return <div className='mx-auto justify-center'><Loader /></div>;
    }
    if (isError) {
        return <h1>Something Went Wrong</h1>;
    }

    console.log(category);
    return (

        <div className="bg-[#205295]">
            <div className="text-center pt-5">
                <h1 className="text-5xl font-bold">Available Jobs</h1>
                <p className="text-xl font-semibold">Pick one to get started!</p>
            </div>
            <div>
                <div className='text-center pt-10'>
                    <Tabs>
                        <TabList>
                            <Tab onClick={handleWDCategory} selected={category === 'Web-Development'}>Web-Development</Tab>
                            <Tab onClick={handleDMCategory} selected={category === 'Digital-Marketing'}>Digital-Marketing</Tab>
                            <Tab onClick={handleGDCategory} selected={category === 'Graphics-Design'}>Graphics-Design</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                                {
                                    jobs?.data.map(job => <JobCard key={job._id} job={job}></JobCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                                {
                                    jobs?.data.map(job => <JobCard key={job._id} job={job}></JobCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                                {
                                    jobs?.data.map(job => <JobCard key={job._id} job={job}></JobCard>)
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>

    );
};

export default Jobs;
