import React, { useEffect, useState } from 'react'
// React core and hooks:
// - useEffect: to perform side effects like data fetching after component mounts
// - useState: to handle local state in the component

import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table'
// ShadCN UI components to render a styled, structured table for displaying data

import { Avatar, AvatarImage } from '../ui/avatar'
// ShadCN UI components to display user/company avatars or profile images

import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '../ui/popover'
// Components used to display interactive popovers (e.g., for actions or info)

import { Edit2, MoreHorizontal } from 'lucide-react'
// Lucide icons:
// - Edit2: pencil icon, typically used for edit buttons
// - MoreHorizontal: three-dot icon, used for overflow menus (more actions)

import { useSelector } from 'react-redux'
// Hook to read values from the Redux store (global state)

import { useNavigate } from 'react-router-dom'
// Hook to navigate programmatically between routes/pages




const CompaniesTable = () => {
  const { companies, searchCompanyByText} = useSelector((store) => store.company)
   const [filterCompany,setFilterCompany] = useState(companies);
   const navigate = useNavigate();
   useEffect(()=>{
    const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true
        };
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);

   },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
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
    filterCompany?.map((company) => (
      <TableRow key={company._id}>
        <TableCell>
          <Avatar>
            <AvatarImage src={company.logo} alt={company.name} />
          </Avatar>
        </TableCell>
        <TableCell>{company.name}</TableCell>
        <TableCell>{company.createdAt}</TableCell>
        <TableCell className="text-right">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2">
              <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
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

export default CompaniesTable
