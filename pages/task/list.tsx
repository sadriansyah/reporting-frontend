import Dashboard from '../../component/Master/dashboard';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import Loader from '../../component/loader/loader';
import DataTask from '../../component/company/task/data-task';

export default function Task(props) {
  const {data} = props.data;
  const [list, setList] = useState([]);
  const [isExist, setIsExist] = useState(false);
  useEffect(() => {
    setIsExist(true);
    setList(data);
  },[])

  const refreshdata = async () => {
    const link = process.env.API_LINK + "task/get-all";
    const res = await fetch(link);
    const data = await res.json();

    setList(data.data);
    setIsExist(true)
    showdata()
  }



  const showdata = () => {

    return (
      isExist ?
      (
        <DataTask datatitle={list} onRefresh={refreshdata} onExist={setIsExist} />
      )
      :
      (
        <Loader />
      )

    )
  }

  return (
    <Dashboard pageTitle="Daily Task  | Thinkmatch Report App">
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Document</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><Link href="/">Thinkmatch</Link></li>
                <li className="breadcrumb-item"><Link href="/task">Document</Link></li>
                <li className="breadcrumb-item active">List Task</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Task</h4>
                <div className="row">
                  <div className="col-6">
                    <p className="sub-title">
                      Create your Task
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <Link href="/task/create-task" className="btn btn-primary"> <i className="fa fa-plus"></i> Create Task</Link>
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
    </Dashboard>
  )
}
export async function getServerSideProps(){
  const link = process.env.API_LINK + "task/get-all";
  const res = await fetch(link);
  const data = await res.json();
  return {
    props:{
      data:data
    }
  }
}
