import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
// Radix UI components to create a popover (dropdown-like) interface
// - PopoverTrigger: element that opens the popover
// - PopoverContent: the content shown inside the popover

import React from "react";
// Core React library to define the component

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// Radix UI components for displaying user profile avatars

import { Button } from "../button";
// Custom styled button component for clickable actions (e.g., logout)

import { LogOut, User } from "lucide-react";
// Lucide icons:
// - LogOut: icon representing the logout action
// - User: icon representing the user/profile

import { Link, useNavigate } from "react-router-dom";
// React Router:
// - Link: used for client-side navigation through anchor-like elements
// - useNavigate: hook for programmatic navigation (e.g., after logout)

import { useDispatch, useSelector } from "react-redux";
// Redux hooks:
// - useDispatch: to dispatch actions (e.g., clearing user data on logout)
// - useSelector: to access current user info from the Redux store

import { toast } from "sonner";
// Library for displaying toast notifications (e.g., logout success/error)

import axios from "axios";
// HTTP client used to make API requests (e.g., logout request)

import { USER_API_END_POINT } from "@/utils/constant";
// Constant defining the API endpoint related to user operations

import { setUser } from "@/redux/authSlice";
// Redux action used to update the user state (e.g., clear user info on logout)



const Navbar = () => {
  
  const {user} = useSelector(store=>store.auth);
  console.log("User:", user);
  const dispatch = useDispatch();
   const navigate = useNavigate();
  
  const logoutHandler = async() =>{
    try{
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      if(res.data.success){
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
      }
    }
  catch(error){
    console.log(error);
    toast.error(error.response.data.message);

  }
}

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex font-medium items-center gap-5">
          {
            user && user.role == 'recruiter' ? (
              <>
                <li><Link to = "/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
              <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
              </>
            )
          }
            
           
          </ul>

          {/* Conditional Rendering for Authentication */}
          {!user ? (
            <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="outline">Login</Button></Link>
            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="w-full h-full rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 bg-white rounded-lg shadow-lg flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 flex-shrink-0">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="w-full h-full rounded-full"
                    />
                  </Avatar>
                  <div className="flex flex-col w-[200px]">
                    <h4 className="font-medium text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">{user?.profile?.Bio}</p>
                  </div>
                </div>
                 {/* View Profile Button */}
                {
                  user && user.role == 'student' && (
                    
                    <div className="flex items-center gap-2">
                  <Button variant="link" className="flex items-center gap-2">
                    <User size={16} /><Link to="/profile">View Profile</Link></Button>
                </div>
                  )
                }
               
                
                {/* Logout Button */}
                <div className="flex items-center gap-2">
                  <Button onClick={logoutHandler} logouvariant="link" className="flex items-center gap-2 text-red-500">
                    <LogOut size={16} /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


