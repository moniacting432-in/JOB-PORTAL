// Importing React to use hooks like useEffect and useState for component logic
import React, { useEffect, useState } from 'react';

// Importing the Navbar component from a shared UI folder, which will be used to display the navigation bar
import Navbar from '../ui/shared/Navbar';

// Importing Input and Button components, which are custom UI components for user input and actions
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input,setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(setsearchCompanyByText(input));
  },[input]);
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
      <div className='flex items-center justify-between my-5'>
      <Input
        className="w-fit"
        placeholder="Filter by name, role"
        onChange={(e)=> setInput(e.target.value)}
        />
      
        <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
     <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs

