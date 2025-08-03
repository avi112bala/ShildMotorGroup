import axiosinstance from "../Axioinstance"

const getBookingList=async()=>{
    const response=await axiosinstance.get("");
    return response;
}