import {useState, useEffect} from 'react';
import Link from 'next/link';
import EditDepartment from '../../../component/company/department/edit-department';
import {deleteData} from '../../../services/helpers';
export default function DataDepartment(props) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [abbr, setAbbr] = useState('');
  const [idDep, setIdDep] = useState('');
  useEffect(() => {
    setData(props.datatitle);
  },[])

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
        props.onExist(false);
        const payload = {
          id:id
        };
        const hapus = await deleteData(payload,"department/delete");
        props.onRefresh();
      }
    })
  }

  const onedit = (id,nm,ab) => {
    setIdDep(id);
    setName(nm);
    setAbbr(ab);
  }

  const onclosing = () => {
    document.getElementById('editModal').click()
  }

  return (
    <div className="table-responsive">
      <table id="datatable" className="table table-striped " style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
        <thead>
          <tr>
            <th>No</th>
            <th>Department Name</th>
            <th>Abbreviation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          data?.map((row,i) => {
            return (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{row.department_name}</td>
                <td><span className="badge bg-success text-light p-2 ">{row.department_abbreviation} </span> </td>
                <td>
                  <button onClick={() => onedit(row._id,row.department_name,row.department_abbreviation)} data-toggle="modal" data-target="#editModal" className="btn btn-warning btn-sm m-1"> <i className="fa fa-edit"></i> </button>
                  <button onClick={() => removedata(row._id)} className="btn btn-danger btn-sm m-1"> <i className="fa fa-trash"></i> </button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      <EditDepartment id={idDep} name={name} abbr={abbr} onExist={props.onExist} onRefresh={props.onRefresh} onclose={onclosing}  />
    </div>
  )
}
