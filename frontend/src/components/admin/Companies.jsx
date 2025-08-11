import React, { useEffect, useState } from 'react'
// React core and hooks:
// - useEffect: run side effects (like API calls) after render
// - useState: manage local component state

import Navbar from '../ui/shared/Navbar'
// Reusable Navbar component used for site navigation

import { Input } from '../ui/input'
// Styled input component for text input fields

import { Button } from '../ui/button'
// Styled button component used for clickable actions

import CompaniesTable from './CompaniesTable'
// Component responsible for displaying a table of companies

import { useNavigate } from 'react-router-dom'
// Hook to programmatically navigate between routes/pages

import useGetAllCompanies from '@/hooks/useGetAllCompanies'
// Custom hook to fetch the list of all companies from the server

import { useDispatch } from 'react-redux'
// Hook to dispatch actions to the Redux store (update global state)

import { setsearchCompanyByText } from '@/redux/companySlice'
// Redux action to update the search text used to filter companies


const Companies = () => {
  useGetAllCompanies();
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
        placeholder="Filter by name"
        onChange={(e)=> setInput(e.target.value)}
        />
      
        <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
