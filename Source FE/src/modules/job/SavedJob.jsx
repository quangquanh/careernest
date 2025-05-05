import React from 'react';
import JobCard from '../../components/card/JobCard';
import { useSelector } from 'react-redux';

const SavedJob = ({ listJobs = [] }) => {
    const appliedJobs = useSelector(state => state?.user?.appliedJobs);

    const checkIsAppliedJob = (id, appliedJobs) => {
        if (!appliedJobs || appliedJobs?.length === 0) return false;
        return appliedJobs.some(item => +item?.job?.id === +id);
    };

    if (listJobs.length <= 0) return null;
    return (
        <div className='w-full flex flex-col gap-y-6 overflow-y-auto h-[calc(100vh-200px)]'>
            {listJobs.map(job => (
                <JobCard key={job?.id} data={job} className='shadow-md' isSaved isApplied={checkIsAppliedJob(job?.id, appliedJobs)} />
            ))}
        </div>
    );
};

export default React.memo(SavedJob);