import {useState, useEffect} from 'react';
import { editData } from '../../../services/helpers';
import axios from 'axios';

const EditDepartment = (props) => {
  const [name, setName] = useState('');
  const [abbr, setAbbr] = useState('');
  const [isSend, setIsSend] = useState(false);

  const closemodal = async(e) => {
      e.preventDefault();
      setIsSend(true);
      props.onclose();
      props.onExist(false);
      const payload = {
        department_name:name ==''? props.name:name,
        department_abbreviation:abbr ==''? props.abbr:abbr
      }
      var link = "department/update/"+props.id;
      const post = await editData(payload,link);
      if(post.status == 200){
        alertify.success("Department Diupdate");
      }else{
        alertify.error("Error "+post.result);
      }
      setName('');
      setAbbr('');
      setIsSend(false);
      props.onRefresh();

  }


  return (
    <div id="editModal" className="modal fade"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">Edit Department</h5>
            <button type="button" className="close" data-dismiss="modal" id="edt"  aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={closemodal}>
          <div className="modal-body">
            <input type="hidden" defaultValue={props.id} />
              <div className="form-group">
                <label>Department Name</label>
                <input type="text" id="nm_dp" className="form-control" defaultValue={props.name} required onChange={e => setName(e.target.value)} placeholder="Insert Department Name" />
              </div>
              <div className="form-group">
                <label>Department Abbreviation</label>
                <input type="text" id="ab_dp" className="form-control" defaultValue={props.abbr} required onChange={e => setAbbr(e.target.value)} placeholder="Insert Department Abbreviation" />
              </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
            {
              isSend?
              (
                <button className="btn btn-warning" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Menyimpan...</span>
                </button>
              )
              :
              (
                <button type="button" type="submit" className="btn btn-warning waves-effect waves-light">Simpan</button>

              )
            }
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditDepartment
