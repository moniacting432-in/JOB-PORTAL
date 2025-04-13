import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // ✅ MISSING IMPORT FIXED


const useGetAllCompanies = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();
  }, []); // ✅ Fixed dependency array
};

export default useGetAllCompanies;
