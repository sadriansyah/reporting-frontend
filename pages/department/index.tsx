import Dashboard from '../../component/Master/dashboard';
import Link from 'next/link';
import Loader from '../../component/loader/loader';
import AddDepartment from '../../component/company/department/add-department';
import EditDepartment from '../../component/company/department/edit-department';
import DataDepartment from '../../component/company/department/data-department';
import { getData } from '../../services/helpers';

import {useEffect, useState } from 'react';
export default function Department() {
  const [list, setList] = useState([]);
  const [isExist, setIsExist] = useState(false);
  useEffect(() => {
    refreshdata();
  },[])

  const refreshdata = async () => {
    const data = await getData("department/get-all");
    if(data.status == 200){
      setList(data.result.data);
      setIsExist(true)
    }else{
      setList();
      setIsExist(true)
    }
    showdata()
  }



  const showdata = () => {
    return (
      isExist?
      (
        <DataDepartment datatitle={list} onRefresh={refreshdata} onExist={setIsExist} />
      )
      :
      (
        <Loader />
      )
    )
  }

  return (
    <Dashboard pageTitle="Department | Thinkmatch Reporting App" >
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Department</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><Link href="/">Thinkmatch</Link></li>
                <li className="breadcrumb-item">Department</li>
                <li className="breadcrumb-item active">List Department</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Department</h4>
                <div className="row">
                  <div className="col-6">
                    <p className="sub-title">
                      List Department
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <button  className="btn btn-primary" data-toggle="modal" data-target="#myModal"> <i className="fa fa-plus"></i> Add New Department</button>
                  </div>
                </div>

                {
                  showdata()
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddDepartment onRefresh={refreshdata} onExist={setIsExist} />
    </Dashboard>
  )
}
