import React from 'react';
import JobCard from '../../components/card/JobCard';

const AppliedJob = ({ listJobs = [] }) => {
    if (listJobs.length <= 0) return null;
    return (
        <div className='w-full flex flex-col gap-y-6 overflow-y-auto h-[calc(100vh-200px)]'>
            {listJobs.map(item => (
                <JobCard key={item?.id} data={item?.job} createdAt={item?.createdAt} className='shadow-md' isApplied />
            ))}
        </div>
    );
};

export default React.memo(AppliedJob);