import Dashboard from '../../component/Master/dashboard';
import Link from 'next/link';
import Loader from '../../component/loader/loader';
import {useEffect, useState} from 'react';
import { showingtime, getData, deleteData } from '../../services/helpers';
import axios from 'axios';

export default function Mom() {
  const [mom, setMom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{

    fetchdata()
  },[])
  async function fetchdata(){
    const data = await getData("mom/get-all");
    if(data.status == 200){
      setMom(data.result.data);
      setIsLoading(false);
    }else {
      setMom([]);
    }
  }


  const showdata = () => {

    return (
      !isLoading ?
      (
      <div className="table-responsive">
        <table id="datatable" className="table table-striped dt-responsive nowrap" style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
      <thead>
        <tr>
          <th>No</th>
          <th>MOM Number</th>
          <th>Project</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
        mom?.map((row,i) => {
          return (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{row.meeting_number}</td>
              <td>{row.meeting_title}</td>
              <td>{showingtime(row.date_and_time)}</td>
              <td>
                <Link href={"/document/mom/"+row._id} className="btn btn-info btn-sm m-1"> <i className="fa fa-eye"></i> </Link>
                <Link href={"/document/mom/edit-mom/"+row._id} className="btn btn-warning btn-sm m-1"> <i className="fa fa-edit"></i> </Link>
                <button onClick={() => removedata(row._id)} className="btn btn-danger btn-sm m-1"> <i className="fa fa-trash"></i> </button>
              </td>
            </tr>
          )
        })
      }

      </tbody>
        </table>
      </div>
      )
      :
      (
        <Loader />
      )

    )
  }

  const removedata = async(id) => {
    swal({
        title: 'Apakah anda yakin?',
        text: "Data yang dihapus tidak dapat dikembalikan",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus!',
        cancelButtonText: 'Batal',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger ml-2',
        buttonsStyling: false,
    }).then(async function (result) {
      if(result.value){
        setIsLoading(true);
        const payload = {
          id:id
        };
        const hapus = await deleteData(payload,"mom/delete");
        fetchdata()
        setIsLoading(false)
      }
    })

  }


  return (
    <Dashboard pageTitle="MoM | Thinkmatch Report App">
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
                <li className="breadcrumb-item"><Link href="#">Document</Link></li>
                <li className="breadcrumb-item active">List MoM</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">MoM</h4>
                <div className="row">
                  <div className="col-6">
                    <p className="sub-title">
                      Create your Mom
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <Link href="/document/create-mom" className="btn btn-primary"> <i className="fa fa-plus"></i> Create Mom</Link>
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
