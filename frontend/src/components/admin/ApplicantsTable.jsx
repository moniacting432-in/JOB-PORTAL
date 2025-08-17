import React from 'react' 
// Required to use JSX and create React components.

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table' 
// Used to build a styled table structure for displaying tabular data.

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// Used to create a popover UI element that shows content when triggered (e.g., on click or hover).

import { MoreHorizontal } from 'lucide-react'
// An icon component showing three horizontal dots, usually for a "more options" button.

import { useSelector } from 'react-redux'
// Hook to access specific data from the Redux store (global state management).

import { toast } from 'sonner'
// Provides non-blocking toast notifications for user feedback (like success/error alerts).

import axios from 'axios'
// Promise-based HTTP client to send API requests to a server.

import { APPLICATION_API_END_POINT } from '@/utils/constant'
// A constant that holds the base URL or endpoint for application-related API calls.


const shortlistingStatus = ["Accepted","Rejected"];
const ApplicantsTable = ({ setSelectedApplicantId }) => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
  {
    applicants && applicants?.applications?.map((item) => {
      console.log("Applicant item:", item); // ✅ Correct place to log

      return (
        <tr key={item._id}>
          <TableCell>{item?.applicant?.fullname}</TableCell>
          <TableCell>{item?.applicant?.email}</TableCell>
          <TableCell>{item?.applicant?.phoneNumber}</TableCell>
          <TableCell>
            {
              item?.applicant?.profile?.resume 
              ? <a 
                  className="text-blue-600 cursor-pointer" 
                  href={item?.applicant?.profile?.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {item?.applicant?.profile?.resumeOrginalName}
                </a> 
              : <span>NA</span>
            }
          </TableCell>
          <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
          <TableCell className="float-right cursor-pointer">
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                {
                  shortlistingStatus.map((status, index) => (
                    <div onClick ={()=>statusHandler(status,item?._id)}key={index} className="flex w-fit items-center my-2 cursor-pointer">
                      <span>{status}</span>
                    </div>
                  ))
                }
              
               
  </PopoverContent>

            </Popover>
          </TableCell>
        </tr>
      );
    })
  }
</TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
