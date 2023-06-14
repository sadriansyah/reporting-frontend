import Dashboard from '../../component/Master/dashboard';
import AddProject from '../../component/company/project/add-project';
import Link from 'next/link';
import DataProject from '../../component/company/project/data-project';
import Loader from '../../component/loader/loader';
import {useEffect, useState} from 'react';
import { getData } from '../../services/helpers';

export default function Project() {
  const [list, setList] = useState([]);
  const [isExist, setIsExist] = useState(false);
  useEffect(() => {
    refreshdata();
  },[])

  const refreshdata = async () => {
    const res = await getData("project/get-all");
    if(res.status == 200){
      setList(res.result.data);
      setIsExist(true)
    }else{
      setList([]);
    }
    showdata()
  }



  const showdata = () => {

    return (
      isExist ?
      (
        <DataProject datatitle={list} onRefresh={refreshdata} onExist={setIsExist} />
      )
      :
      (
        <Loader />
      )

    )
  }

  return (
    <Dashboard pageTitle="Project | Thinkmatch Report App">
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Project</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><Link href="/">Thinkmatch</Link></li>
                <li className="breadcrumb-item">Project</li>
                <li className="breadcrumb-item active">List Project</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Project</h4>
                <div className="row">
                  <div className="col-6">
                    <p className="sub-title">
                      List Project
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <button  className="btn btn-primary" data-toggle="modal" data-target="#myModal"> <i className="fa fa-plus"></i> Add New Project</button>
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
    <AddProject onRefresh={refreshdata} onExist={setIsExist} />
    </Dashboard>
  )
}

// export async function getServerSideProps(){
//   const link = process.env.API_LINK + "project/get-all";
//   const res = await fetch(link);
//   const data = await res.json();
//   return {
//     props:{
//       data:data
//     }
//   }
// }
