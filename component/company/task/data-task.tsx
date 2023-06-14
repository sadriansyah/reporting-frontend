import {useState, useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';
export default function DataTask(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.datatitle);
  },[])

  const removedata = async(id) => {
    console.log(id)
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
        const link = process.env.API_LINK +"task/delete";
        const hapus = await axios({
          method:'POST',
          url:link,
          data:{
            id:id
          }
        });
        props.onRefresh();
      }
    })

  }

  const showDate = (date) => {
      date = new Date(date)
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      var month2 = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var tanggal = day + ' ' + month2[month] + ' ' + year;
      return tanggal;
  }

  return (
    <div className="table-responsive">
      <table id="datatable" className="table table-striped " style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
        <thead>
          <tr>
            <th>No</th>
            <th style={{width: "10%"}}>Date</th>
            <th>Username</th>
            <th style={{width: "15%"}}>Done</th>
            <th style={{width: "15%"}}>Doing</th>
            <th style={{width: "15%"}}>To Do</th>
            <th style={{width: "15%"}}>Blocker</th>
            <th style={{width: "10%"}}>No Handphone</th>
            <th style={{width: "15%"}}>Action</th>
          </tr>
        </thead>
        <tbody>
        {

          data?.map((row,i) => {
            return (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{showDate(row.task_date)}</td>
                <td>{row.user_name}</td>
                <td className='white-space'>{row.done}</td>
                <td className='white-space'>{row.doing}</td>
                <td className='white-space'>{row.to_do}</td>
                <td className='white-space'>{row.blocker}</td>
                <td>{row.no_handphone}</td>
                <td>
                  <Link href={"/task/detail/"+row._id} className="btn btn-info btn-sm m-1"> <i className="fa fa-eye"></i> </Link>
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
