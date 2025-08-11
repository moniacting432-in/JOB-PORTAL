
import React, { useEffect, useState } from "react";
// React core and hooks:
// - useEffect: to handle side effects (e.g., updating Redux state on change)
// - useState: to manage local component state (e.g., selected radio option)

import { RadioGroup, RadioGroupItem } from "../radio-group";
// Custom or styled radio button group components used for selecting filter options

import { Label } from "../label";
// Label component associated with each radio button for accessibility and styling

import { useDispatch } from "react-redux";
// Redux hook used to dispatch actions to update the global state

import { setSearchedQuery } from "@/redux/jobSlice";
// Redux action to set or update the search query for job filtering


const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Hyderabad", "Kolkata", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];
const FilterCard = () => {
  const [selectedValue,setSelectedValue] =useState('');
  const dispatch=useDispatch();

  const changeHandler = (value)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
   dispatch(setSearchedQuery(selectedValue));
    
  },[selectedValue]);
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
            filterData.map((data,index)=>(
                 <div key={index}> {/* ✅ Add key here */}
                   <h1 className='font-bold text-lg'>{data.filterType}</h1>
                   {
                    data.array.map((Item,idx)=> {
                      const itemId=`id${index}-${idx}`
                        return(
                             <div key={itemId} className="flex items-center space-x-2 my-2">
                            <RadioGroupItem value={Item} id={itemId}/>
                    <Label htmlFor={itemId}>{Item}</Label>
                            </div>
                        )
                    })
                   }
                </div>
            ))
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
