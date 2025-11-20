'use client'

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import BreadcrumbComponent from "./components/Breadcrumb"

export default function LoginPage() {
 
  return (
    <div>
      <div className="container" style={{ maxWidth: 'inherit' }}>
        <BreadcrumbComponent />
        <div className=" mt-3 mb-5 p-5" style={{ backgroundColor: 'white', borderRadius: '2px' }}>
          <div className="row justify-content-center mb-3 mt-3">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="login-form">
                <LoginForm />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="register-form">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
