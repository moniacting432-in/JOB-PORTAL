// Importing React and necessary hooks for managing component state and side effects
import React, { useEffect, useState } from 'react';

// Importing various table components from a custom UI library or file to display tables
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

// Importing Popover components to create dropdown-like menus for user interactions
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

// Importing specific icons from the lucide-react library, which is used for vector icons
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';

// Importing the useSelector hook from 'react-redux' to access the Redux store's state
import { useSelector } from 'react-redux';

// Importing the useNavigate hook from 'react-router-dom' to programmatically navigate between routes
import { useNavigate } from 'react-router-dom';



const AdminJobsTable = () => {
  const { companies, searchCompanyByText} = useSelector((store) => store.company);
  const {allAdminJobs} = useSelector(store=>store.job);
   const [filterJobs,setFilterJobs] = useState(allAdminJobs);
   const navigate = useNavigate();
   useEffect(() => {
    if (!Array.isArray(companies)) return;
  
    const filteredJobs = allAdminJobs?.filter((job) => {
      if (!searchCompanyByText) return true;
  
      return job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
  
    setFilterJobs(filteredJobs);
  }, [companies, searchCompanyByText, allAdminJobs]);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {Array.isArray(companies) && companies.length <= 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        You haven't registered any company
      </TableCell>
    </TableRow>
  ) : (
    filterJobs?.map((job) => (
      <TableRow key={job._id}>
        
        <TableCell>{job?.company?.name}</TableCell>
        <TableCell>{job?.title}</TableCell>
        <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
        <TableCell className="text-right">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2">
              <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </div>
              <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
              <Eye className='w-4'/>
              <span>Applicants</span>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

      </Table>
    </div>
  )
}

export default AdminJobsTable

