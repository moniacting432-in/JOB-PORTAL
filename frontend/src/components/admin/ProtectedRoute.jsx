import { useEffect } from "react";
// React hook to perform side effects like checking authentication or fetching data after component renders

import { useSelector } from "react-redux";
// Hook to access values from the Redux store (global state)

import { useNavigate } from "react-router-dom";
// Hook to programmatically redirect or navigate between routes/pages


const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate("/");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;