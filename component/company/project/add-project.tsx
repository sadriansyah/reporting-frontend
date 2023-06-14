import {useState, useEffect} from 'react';
import { postData } from '../../../services/helpers';

const AddProject = (props) => {
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [prefix, setPrefix] = useState('');
  const [pic, setPic] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isSend, setIsSend] = useState(false);

  const closemodal = async(e) => {
      setIsSend(true);
      e.preventDefault();
      props.onExist(false);
      const payload = {
        project_name:projectName,
        project_company:client,
        project_prefix:prefix,
        project_pic:pic,
        project_email:email,
        project_contact:contact
      }
      try {
        const post = await postData(payload,"project/create");
        console.log(post);
        alertify.success("Project Ditambahkan");
        document.getElementById('formProject').reset();
      } catch (error) {
        alertify.error("Error "+error.message);
      }

      props.onRefresh();
      setIsSend(false);
      document.getElementById('closing').click();

  }


  return (
    <div id="myModal" className="modal fade"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">Project</h5>
            <button type="button" className="close" data-dismiss="modal" id="closing"  aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={closemodal} id="formProject">
          <div className="modal-body">
              <div className="form-group">
                <label>Project Name</label>
                <input type="text" className="form-control" required onChange={e => setProjectName(e.target.value)} placeholder="Insert Project Name" />
              </div>
              <div className="form-group">
                <label>Client Company</label>
                <input type="text" className="form-control" required onChange={e => setClient(e.target.value)} placeholder="Insert Company Name" />
              </div>
              <div className="form-group">
                <label>Company Prefix</label>
                <input type="text" className="form-control" required onChange={e => setPrefix(e.target.value)} placeholder="Insert Company Prefix" />
                <small className="form-text text-muted">For Numbering Format (eg. 001/DEV/TM-<span className="text-danger"><b>PTDH</b></span>/XI/2022)</small>
              </div>
              <div className="form-group">
                <label>PIC</label>
                <input type="text" className="form-control" required onChange={e => setPic(e.target.value)} placeholder="Insert Project PIC" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required onChange={e => setEmail(e.target.value)} placeholder="Insert Pic Email" />
              </div>
              <div className="form-group">
                <label>Contact <small>(optional)</small></label>
                <input type="text" className="form-control"  onChange={e => setContact(e.target.value)} placeholder="Insert Contact" />
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

export default AddProject
