import React, { useState } from 'react'
// React core and useState hook to manage local component state

import Navbar from '../ui/shared/Navbar'
// Reusable Navbar component used for page navigation

import { Label } from '../ui/label'
// Styled label component for form fields

import { Input } from '../ui/input'
// Styled input field component for user input

import { Button } from '../ui/button'
// Styled button component for form submission or actions

import { useSelector } from 'react-redux'
// Hook to access data from the Redux store (global state)

import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select'
// Styled Select dropdown components for choosing options (e.g., job type, location)

import axios from 'axios'
// HTTP client for sending API requests to the backend

import { toast } from 'sonner'
// Toast notification library for displaying success/error/info messages

import { useNavigate } from 'react-router-dom'
// Hook to programmatically navigate between routes/pages

import { Loader2 } from 'lucide-react'
// Spinner icon used to show a loading state during actions like form submission

import { JOB_API_END_POINT } from '@/utils/constant'
// Constant holding the base URL or endpoint for job-related API calls


const companyArray = [];

const PostJob = () => {
    const [input,setInput] = useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0,
        companyId:""
    });
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const {companies} = useSelector(store=>store.company);
    const ChangeEventHandler = (e) =>{
        setInput({...input,[e.target.name]:e.target.value});
    };
    const selectChangeHandler = (value) =>{
        const selectedCompany=companies.find((company)=> company.name.toLowerCase()==value);
        setInput({...input,companyId:selectedCompany._id});
    }
    const submitHandler = async(e) =>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                     'Content-Type':'application/json'
                },
                withCredentials:true
            });
          if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs");
          }
        } catch(error){
           toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center w-screen my-5'>
      <form onSubmit={submitHandler} action="" className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md '>
      <div className='grid grid-cols-2 gap-2'>
      <div>
        <Label>Title</Label>
        <Input
        type="text"
        name="title"
        value={input.title}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
        type="text"
        name="description"
        value={input.description}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
      <div>
        <Label>Requirements</Label>
        <Input
        type="text"
        name="requirements"
        value={input.requirements}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
      <div>
        <Label>Salary</Label>
        <Input
        type="text"
        name="salary"
        value={input.salary}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
      <div>
        <Label>Location</Label>
        <Input
        type="text"
        name="location"
        value={input.location}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
      <div>
        <Label>Job Type</Label>
        <Input
        type="text"
        name="jobType"
        value={input.jobType}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
      <div>
        <Label>Experience Level</Label>
        <Input
        type="text"
        name="experience"
        value={input.experience}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
      <div>
        <Label>Position</Label>
        <Input
        type="number"
        name="position"
        value={input.position}
        onChange={ChangeEventHandler}
        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
        />
      </div>
    
      {
         companies.length > 0 && (
            <Select onValueChange={selectChangeHandler}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {
            companies.map((company)=>{
                return(
                <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                )
            })
        }
         
          
        </SelectGroup>
      </SelectContent>
    </Select>
    
         )
      }
      </div>
    
      {
 loading? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>: <Button type="submit" className="w-full my-4">
        Post New Job
          </Button>
}
      {
        companies.length ==0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register  a company first before posting a job</p>
      }
      </form>
      </div>
    </div>
  )
}

export default PostJob
