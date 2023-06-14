import Dashboard from '../../component/Master/dashboard';
import Loader from '../../component/loader/loader';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {postData, getData } from "../../services/helpers";



export default function CreateUsers() {
  const [listDepartment, setListDepartment] = useState([]);
  const [isSend, setIsSend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getDepartment()

  },[])

  const getDepartment = async() => {
    const link = await getData("department/get-all");
    if(link.status == 200){
      setListDepartment(link.result.data);
    }

  }

  const submitHandler = async(e) => {
    e.preventDefault();
    setIsSend(true);
    const formdata = new FormData(e.target);
    const payload = {
      fullname:formdata.get('fullname'),
      email:formdata.get('email'),
      handphone:formdata.get('handphone'),
      level:formdata.get('level'),
      department_id:formdata.get('department_id')
    }
    const send = await postData(payload,"users/create");
    if(send.status == 201){
      alertify.success("Users Telah ditambahkan");
      router.push('/users');
    }else{
      alertify.error(`Error : ${send.result}`);
    }
    setIsSend(false);
  }



  return (
    <>
    <Dashboard pageTitle="MoM | Thinkmatch Report App">
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Create Users</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><Link href="/">Thinkmatch</Link></li>
                <li className="breadcrumb-item"><Link href="/users">Mom</Link></li>
                <li className="breadcrumb-item active">Form Users</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
              <h4 className="mt-0 header-title">Form Users</h4>
                <p className="sub-title">Fill form below</p>
                <form onSubmit={submitHandler}>

                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Fullname</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="text" name="fullname" required placeholder="Insert Fullname" />
                  </div>
                  <label htmlFor="example-search-input" className="col-sm-2 col-form-label">Department</label>
                  <div className="col-sm-4">
                    <select className="form-control" name="department_id" >
                      {
                        listDepartment?.map((row,i) => {
                          return(
                            <option key={i} value={row._id} >{row.department_name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="email" name="email" required placeholder="Insert Email"  />
                  </div>
                  <label htmlFor="example-search-input" className="col-sm-2 col-form-label">Handphone</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="text" name="handphone" required placeholder="Insert Phone Number"  />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="example-url-input" className="col-sm-2 col-form-label">Level</label>
                  <div className="col-sm-4">
                    <select className="form-control" name="level">
                      <option value="Pegawai">Pegawai</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>


                <div className="form-group row">
                  <div className="col-sm-12 text-right">
                    {
                      isSend?
                      (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="sr-only">Submiting...</span>
                        </button>
                      )
                      :
                      (
                        <button type="submit" className="btn btn-primary p-2" name="button">Submit</button>
                      )
                    }
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Dashboard>
    </>
  )
}
