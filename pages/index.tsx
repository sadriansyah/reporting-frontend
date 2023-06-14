import Master from '../component/Master';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '../services/authentication';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] =  useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookie, setCookie] = useCookies(["tm_access_token"]);
  const router = useRouter();

  const submitForm = async(e) => {
    e.preventDefault();
    const loginForm = new FormData(e.target);
    const payload = {
      email:loginForm.get('email'),
      password:loginForm.get('password')
    }
    const authen = await login(payload);
    console.log(authen);
    if(authen.status == 201){
      setIsError(false);
      setErrorMessage('');
      const data = JSON.parse(authen.message);
      setCookie("tm_access_token",data.access_token);
      router.push("/dashboard");
    }else{
      setIsError(true);
      setErrorMessage(authen.message);
    }
    showError();
  }

  const showError = () => {
    return(
      isError?
      (
        <div className="alert alert-danger">
          <i className="fa fa-alert"></i> <span>Sign Error! {errorMessage} </span>
        </div>
      )
      :
      (
        <>
        </>
      )
    )
  }

  return (
    <Master pageTitle="Login | Thinkmatch Report App">
        <div>
          <div className="accountbg" />
          <div className="home-btn d-none d-sm-block">
            <Link href="/" className="text-white"><i className="fas fa-home h2" /></Link>
          </div>
          <div className="wrapper-page">
            <div className="card card-pages shadow-none">
              <div className="card-body">
                <div className="text-center m-t-0 m-b-15">
                  <Link href="/" className="logo logo-admin">
                  <Image src="/assets/images/logo-thinkmatch.png" height={24} width={150} alt="Logo" />
                  </Link>
                </div>
                <h5 className="font-18 text-center">Sign in to create Document Report.</h5>
                {
                  showError()
                }
                <form className="form-horizontal m-t-30" onSubmit={submitForm}>
                  <div className="form-group">
                    <div className="col-12">
                      <label>Email</label>
                      <input className="form-control" name="email" type="email" required placeholder="Email" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <label>Password</label>
                      <input className="form-control" name="password" type="password" required placeholder="Password" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <div className="checkbox checkbox-primary">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1"> Remember me</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-center m-t-20">
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary btn-block btn-lg waves-effect waves-light" >Log In</button>
                    </div>
                  </div>
                  </form>
                  <div className="form-group row m-t-30 m-b-0">
                  {
                    // <div className="col-sm-7">
                    // <a href="/forgot-password" className="text-muted"><i className="fa fa-lock m-r-5" /> Forgot your password?</a>
                    // </div>

                  }

                  </div>
              </div>
            </div>
          </div>
        </div>
    </Master>
  )
}

export async function getServerSideProps(context){
  return {
    redirect: {
       permanent: false,
       destination: "/login",
     }
  }
}
