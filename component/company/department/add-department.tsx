import {useState, useEffect} from 'react';
import { postData } from '../../../services/helpers';
const AddDepartment = (props:any) => {
  const [name, setName] = useState('');
  const [abbr, setAbbr] = useState('');
  const [isSend, setIsSend] = useState(false);

  const closemodal = async(e:any) => {
      e.preventDefault();
      setIsSend(true);
      props.onExist(false);
      const payload = {
        department_name:name,
        department_abbreviation:abbr
      }
      try {
        const post = await postData(payload,"department/create");
        alertify.success("Department Ditambahkan");

      } catch (error) {
        console.log(error);
        alertify.error("Error "+error.message);
      }
      setIsSend(false);
      document.getElementById('closing').click();
      setName('');
      setAbbr('');
      document.getElementById('nm_dp').value="";
      document.getElementById('ab_dp').value="";
      props.onRefresh();
  }


  return (
    <div id="myModal" className="modal fade"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">Department</h5>
            <button type="button" className="close" data-dismiss="modal" id="closing"  aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={closemodal}>
          <div className="modal-body">
              <div className="form-group">
                <label>Department Name</label>
                <input type="text" id="nm_dp" className="form-control"  onChange={e => setName(e.target.value)} placeholder="Insert Department Name" />
              </div>
              <div className="form-group">
                <label>Department Abbreviation</label>
                <input type="text" id="ab_dp" className="form-control" required onChange={e => setAbbr(e.target.value)} placeholder="Insert Department Abbreviation" />
              </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
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
                <button type="button" type="submit" className="btn btn-primary waves-effect waves-light">Submit</button>
              )
            }
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddDepartment
