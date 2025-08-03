import axios from "axios";


const axiosinstance=axios.create({
    baseURL:import.meta.env.VITE_BASE_API_URL,
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    }
})

const platforDetails={
    deviceId:"",
    deviceName:"Unknown",
    deviceType:"",
    deviceModel:"Unknown",
    os:"",
    osVersion:""
}

platforDetails.deviceName=navigator.userAgent??"Unknown";
platformDetails.deviceId = Math.random().toString(36).slice(2) ?? "Unknown";
platformDetails.deviceType = navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop";
platformDetails.osVersion = getOSVersion() ?? "Unknown";
platformDetails.os = navigator.platform ?? "Unknown";

function getOSVersion() {
    const userAgent = navigator.userAgent;
    const osVersion = userAgent.match(/(?:Windows NT|Macintosh|Linux|Android|iOS) ([\d._]+)/);
    return osVersion && osVersion[1] ? osVersion[1] : "Unknown";
  }


axiosinstance.interceptors.request.use((config)=>{
    const accesstoken=sessionStorage.getItem("token");
    if(accesstoken){
        config.headers["Authorization"]=`${accesstoken}`
        config.headers["deviceName"]=platformDetails.deviceName
        config.headers["deviceId"] = platformDetails.deviceId;
        config.headers["deviceType"] = platformDetails.deviceType;
        config.headers["os"] = platformDetails.os;
        config.headers["osVersion"] = platformDetails.osVersion;
        config.headers["deviceModel"] = platformDetails.deviceModel;
    }
    return config
})


axiosinstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        const errorData = error?.response?.data;

        if (error.response && error.response.status === 401) {
          // Clear the token from session storage
          sessionStorage.removeItem("token");
          window.location.href = "/auth/signin";
        }
        if (error?.response?.status === 400 || error?.response?.status === 401) {
          toast.error(errorData.data);
        } else {
          toast.error("Sorry we are facing some issues , Please try again");
        }
        return Promise.reject(error);
    }
)


export default axiosinstance;
