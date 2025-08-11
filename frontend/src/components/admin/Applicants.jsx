// Importing React and the necessary hook for handling side effects
import React, { useEffect, useState } from 'react'; // add useState

// Importing components: Navbar for navigation, ApplicantsTable for displaying the applicants' data
import Navbar from '../ui/shared/Navbar';
import ApplicantsTable from './ApplicantsTable';

// Importing axios for making HTTP requests to fetch data
import axios from 'axios';

// Importing constants like the API endpoint to fetch data from
import { APPLICATION_API_END_POINT } from '@/utils/constant';

// Importing React Router hooks for accessing route parameters
import { useParams } from 'react-router-dom';

// Importing Redux hooks for dispatching actions and accessing the state from the Redux store
import { useDispatch, useSelector } from 'react-redux';

// Importing the Redux action for setting the applicants in the state
import { setAllApplicants } from '@/redux/applicationSlice';

import ChatBox from '../ChatBox'; // adjust path if needed


const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application)
      const [selectedApplicantId, setSelectedApplicantId] = useState(null); // ✅ ADD THIS
  const { user } = useSelector(store => store.auth); // ✅ ADD THIS
    useEffect(()=>{
       const fetchAllApplicants = async () => {
        try{
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
            dispatch(setAllApplicants(res.data.job));
        }catch{
            console.log(error);
        }
       };
       fetchAllApplicants();
    },[]);
   return (
  <div>
    <Navbar />
    <div className='max-w-7xl mx-auto'>
      <h1 className='font-bold text-xl my-5'>
        Applicants {applicants?.applications?.length}
      </h1>

      {/* 👇 Table with prop to trigger chat */}
      <ApplicantsTable setSelectedApplicantId={setSelectedApplicantId} />

      {/* 👇 Chat box appears when recruiter selects an applicant */}
      {selectedApplicantId && (
        <ChatBox
          username={user?.username}
          roomId={`${user?._id}_${selectedApplicantId}`}
        />
      )}
    </div>
  </div>
);

}

export default Applicants
