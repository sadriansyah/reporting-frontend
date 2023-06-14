import Dashboard from '../../component/Master/dashboard';
import Loader from '../../component/loader/loader';
import { getData, deleteData } from '../../services/helpers';
import {useEffect, useState} from 'react';
import Link from 'next/link';

export default function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dep, setDep] = useState([]);

  useEffect(() => {
    fetchdata()
  },[])

  async function fetchdata(){
    const users = await getData("users/get-all");
    if(users.status == 200){
      setData(users.result.data);
    }
    const department = await getData("department/get-all");
    if(department.status == 200){
      setDep(department.result.data);
    }
    setIsLoading(false);
  }
  const showdepartment = (id) => {
    const keyid = dep.find(({_id}) => _id == id);
    return keyid? keyid.department_name : <span className='badge bg-danger text-light p-2'>(Belum Terdaftar)</span>;
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
        const hapus = await deleteData(payload, "users/delete");
        fetchdata()
        setIsLoading(false)
      }
    })

  }

  const showdata = () => {
    return(
      isLoading?
      (
        <Loader />
      )
      :
      (
        <table id="datatable" className="table table-striped dt-responsive nowrap" style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Handphone</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
        data?.map((row,i) => {
          return (
            <tr key={i}>
              <td>{i+1}.</td>
              <td>{row.fullname}</td>
              <td>{row.email}</td>
              <td>{row.handphone}</td>
              <td>{showdepartment(row.department_id)}</td>
              <td>
                <button onClick={() => removedata(row._id)} className="btn btn-danger btn-sm m-1"> <i className="fa fa-trash"></i> </button>
              </td>
            </tr>
          )
        })
      }

      </tbody>
        </table>
      )
    )
  }


  return (
    <Dashboard pageTitle="Users | Thinkmatch Reporting App">
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Users</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><Link href="/">Thinkmatch</Link></li>
                <li className="breadcrumb-item">Users</li>
                <li className="breadcrumb-item active">List Users</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Users</h4>
                <div className="row">
                  <div className="col-6">
                    <p className="sub-title">
                      Users List
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <Link href="/users/create-users" className="btn btn-primary"> <i className="fa fa-plus"></i> Add New Users</Link>
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
