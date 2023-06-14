import {useState, useEffect} from 'react';
import Link from 'next/link';
import { deleteData } from '../../../services/helpers';
export default function DataProject(props) {
  const [data, setData] = useState([]);
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
        const hapus = await deleteData(payload,"project/delete");
        props.onRefresh();
      }
    })

  }

  return (
    <div className="table-responsive">
      <table id="datatable" className="table table-striped " style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
        <thead>
          <tr>
            <th>No</th>
            <th>Project Name</th>
            <th>Company</th>
            <th>PIC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          data?.map((row,i) => {
            return (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{row.project_name}</td>
                <td><span className="badge bg-success text-light p-2 ">{row.project_company} ({row.project_prefix})</span> </td>
                <td>{row.project_pic} ({row.project_email})</td>
                <td>
                  <Link href={"/project/detail/"+row._id} className="btn btn-info btn-sm m-1"> <i className="fa fa-eye"></i> </Link>
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
}
