import { create } from "zustand";
import { persist } from "zustand/middleware";

export const AuthUsers=create(
    persist(
        (set)=>({
            mobileNumber:undefined,
            email:"",
            fullName:"",
            otpToken:"",
            password:"",
            forgetPassword:"",
            setForgetPassword:(forgetPassword)=>set(forgetPassword),
            setMobileNumber:(mobileNumber)=>set(mobileNumber),
            setEmail: (email) => set({ email }),
            setFullName: (fullName) => set({ fullName }),
            setOtpToken: (otpToken) => set({ otpToken }),
            setPassword: (password) => set({ password }),
        }),
        {
            name:"auth-store",
            partialize:((state)=>({
                mobileNumber:state.mobileNumber,
                email:state.email,
                fullName:state.fullName
            }))
        }
    )
) 