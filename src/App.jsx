import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainHeader from './MainHeader/MainHeader'
import SignIn from './Pages/SignIn/SignIn'
import DefaultLayout from './DefualtPage/DefaultPage'
import SignUp from './Pages/SignUp/SignUp'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import ServicesPage from './Pages/Services/Services'
import PageWrapper from './DefualtPage/Pagewrapper'
import Termsandcondition from './Pages/Termsandcondition/Termsandcondition'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainHeader />}></Route>
          <Route
            path="/auth/signin"
            element={
              <DefaultLayout>
                <PageWrapper>
                  <SignIn />
                </PageWrapper>
              </DefaultLayout>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <DefaultLayout>
                <PageWrapper>
                  <SignUp />
                </PageWrapper>
              </DefaultLayout>
            }
          />
          <Route
            path="/auth/forget"
            element={
              <DefaultLayout>
                <PageWrapper>
                  <ForgetPassword />
                </PageWrapper>
              </DefaultLayout>
            }
          />
          
          <Route
            path="/services"
            element={
              <DefaultLayout>
                <PageWrapper>
                  <ServicesPage />
                </PageWrapper>
              </DefaultLayout>
            }
          />
          <Route
            path="/terms-condition"
            element={
              <DefaultLayout>
                <PageWrapper>
                  <Termsandcondition />
                </PageWrapper>
              </DefaultLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
