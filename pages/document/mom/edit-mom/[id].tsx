import Dashboard from "../../../../component/Master/dashboard";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData, getUserLog , showingtime, editData} from '../../../../services/helpers';
import loadjs from 'loadjs';
export default function EditMom(props:any) {
  const [momNumber, setMomNumber] = useState('');
  const [listProject, setListProject] = useState([]);
  const [dataMom, setDataMom] = useState([]);
  const [datetime, setDatetime ] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [existFile, setExistFile] = useState([]);
  const [fileIsRender, setFileIsRender] = useState(true);
  const [toEmail, setToEmail] = useState([]);
  const [ccEmail, setCcEmail] = useState([]);
  const [typingTo, setTypingTo] = useState('');
  const [typingCc, setTypingCc] = useState('');

  const router = useRouter();
  const {id} = props;
  useEffect(() => {
    fetchdata();
  },[])

  const fetchdata = async() => {
    const link = "mom/detail/"+id;
    const res = await getData(link);
    if(res.status == 200){
      setDataMom(res.result.data.mom);
      setMomNumber(res.result.data.mom.meeting_number);
      setExistFile(res.result.data.mom.meeting_attachment.split(','));
      setToEmail(res.result.data.mom.to_email.split(','));
      setCcEmail(res.result.data.mom.cc_email.split(','));
    }else{
      alertify.error(`Error : ${res.result}`);
    }
    const project = await getData("project/get-all");
    if(project.status == 200){
      setListProject(project.result.data);
    }else{
      alertify.error(`Error : ${project.result}`);
    }
    setIsReady(false);

  }

  const showToEmail = () => {
    return (
      toEmail.map((row,i) => {
        return(
          <span className="badge bg-danger p-1 m-1 text-light" key={i}>{row}<a href="#" onClick={e => removeItemToEmail(i)}> <i className="fa fa-times text-light"/> </a></span>
        )
      })
    )
  }

  const showCcEmail = () => {
    return (
      ccEmail.map((row,i) => {
        return(
          <span className="badge bg-danger p-1 m-1 text-light" key={i}>{row}<a href="#" onClick={e => removeItemCcEmail(i)}> <i className="fa fa-times text-light"/> </a></span>
        )
      })
    )
  }

  const removeItemToEmail = (i) => {
    var tempEmail = toEmail;
    tempEmail.splice(i,1);
    setToEmail(old => [...old]);
    showToEmail();
  }

  const removeItemCcEmail = (i) => {
    var tempEmail = ccEmail;
    tempEmail.splice(i,1);
    setCcEmail(old => [...old]);
    showCcEmail();
  }

  const onTypeToEmail = (e) => {
    if(e.key == ','){
      var tempEmail = toEmail;
      tempEmail.push(typingTo.replace(",",""));
      setTypingTo('');
      setToEmail(old => [...old]);
      showToEmail();
    }
  }

  const onTypeCcEmail = (e) => {
    if(e.key == ','){
      var tempEmail = ccEmail;
      tempEmail.push(typingCc.replace(",",""));
      setTypingCc('');
      setCcEmail(old => [...old]);
      showCcEmail();
    }
  }
  const changeOption = (e:any) => {
    const pref = e.split('|');
    setDefaultNumbering(pref[0]);
  }

  const setDefaultNumbering = async(comprefix:any) => {
    const log = await getUserLog();
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    var number = 0;
    var abbr = dataMom.meeting_number.split('/');
    const getNumber = await getData(`mom/with-prefix/${comprefix}`);
    if(getNumber.status == 200){
      if(getNumber.result.length > 0){
        const numberState = getNumber.result[0].meeting_number.split("/");
        if(numberState[5] == year){
          number =  parseInt(numberState[0]);
        }
      }
    }
    number = String(number+1).padStart(3,'0');
    var romawi = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
    var mynumber = `${number}/MOM/${abbr[2]}/TM-${comprefix}/${romawi[month]}/${date.getFullYear()}`;
    setMomNumber(mynumber);

  }


  const showExistFile = () => {
    return (
      fileIsRender?
      (
        <div>
          {
            existFile.length>0?
            (
              <>
              {
                existFile?.map((row,i) => {
                  if(row !='')
                  return (
                    <span key={i} className="badge bg-info p-2 mb-2 mr-2"> <i className="fa fa-file text-white"></i> {row} <a href="#" onClick={() => removeFile(row)}><i className="fa fa-times text-danger"></i></a></span>
                  )
                })
              }
              </>
            )
            :
            (
              <></>
            )

          }
        </div>
      ):
      (
        <></>
      )
    )
  }

  const removeFile = async(filename:any) => {
    swal({
        title: 'Apakah anda yakin?',
        text: "File yang dihapus tidak dapat dikembalikan",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus!',
        cancelButtonText: 'Batal',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger ml-2',
        buttonsStyling: false,
    }).then(async function (result) {
      if(result.value){
        setFileIsRender(false);
        var index = existFile.indexOf(filename);
        existFile.splice(index,1);
        setExistFile(existFile);
        showExistFile();
        setTimeout(() => {
          setFileIsRender(true);
        }, 500);
      }
    })




  }

  const submitHandler = async(e:any) => {
    e.preventDefault();
    // setIsSend(true);
    const formdata = new FormData(e.target);
    const project_pref = formdata.get('mom_project');
    const project_id = project_pref.split("|");
    formdata.append('meeting_project_id',project_id[1]);
    formdata.append('existing_attachment',JSON.stringify(existFile));
    formdata.append('to_email', toEmail.toString());
    formdata.append('cc_email',ccEmail.toString());
    const link = "mom/update/"+id;
    const send = await editData(formdata,link);
    if(send.status == 200){
      alertify.success("Mom has been Updated!");
      router.push('/document/mom/'+send.result._id);
    }else{
      alertify.error(`Error : ${JSON.stringify(send.result)}`)
    }
  }

  return (
  <Dashboard pageTitle="Edit Mom | Thinkmatch Reporting App">
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
                <li className="breadcrumb-item"><Link href="/document/mom">Mom</Link></li>
                <li className="breadcrumb-item active">Form MoM</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              {
                isReady?
                (
                <div className="card-body text-center">
                  <span className="spinner-border spinner-border-sm"></span> <span>Waiting</span>
                </div>
                )
                :
                (
                <div className="card-body">
                  <h4 className="mt-0 header-title">Form MoM</h4>
                  <p className="sub-title">Fill form below</p>
                  <form onSubmit={submitHandler}>

                    <div className="form-group row">
                      <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Mom Number</label>
                      <div className="col-sm-4">
                        <input className="form-control" type="text" value={momNumber} name="meeting_number" onChange={e => setMomNumber(e.target.value)} required  id="example-text-input" placeholder="Project Number" />
                      </div>
                      <label htmlFor="example-search-input" className="col-sm-2 col-form-label">Project</label>
                      <div className="col-sm-4">
                        <select className="form-control" name="mom_project" onChange={e => changeOption(e.target.value)}>
                          {
                            listProject?.map((row,i) => {
                              return(
                              <option key={i} value={row.project_prefix+"|"+row._id} >{row.project_name}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Date and Time</label>
                      <div className="col-sm-4">
                        <input className="form-control" type="date" name="date_and_time" required defaultValue={showingtime(dataMom.date_and_time)} onChange={e => setDatetime(e.target.value)} id="example-text-input" />
                      </div>
                      <label htmlFor="example-search-input" className="col-sm-2 col-form-label">Meeting Location</label>
                      <div className="col-sm-4">
                        <input className="form-control" type="text" name="meeting_location" defaultValue={dataMom.meeting_location} required placeholder="Insert Location" id="example-search-input" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="example-email-input" className="col-sm-2 col-form-label">Meeting Organizer</label>
                      <div className="col-sm-4">
                        <input className="form-control" type="text" name="meeting_organizer" required defaultValue={dataMom.meeting_organizer}  placeholder="Insert Organizer" id="example-email-input" />
                      </div>
                      <label htmlFor="example-url-input" className="col-sm-2 col-form-label">Meeting Chair</label>
                      <div className="col-sm-4">
                        <input className="form-control" type="text" name="meeting_chair" required defaultValue={dataMom.meeting_chair} placeholder="Input Chair" id="example-url-input" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="example-tel-input" className="col-sm-2 col-form-label">Meeting Draft Dated</label>
                      <div className="col-sm-4">
                        <input className="form-control" type="date" name="meeting_draft_dated" defaultValue={showingtime(dataMom.meeting_draft_dated)} required placeholder="Insert Number" id="example-tel-input" />
                      </div>
                      <label htmlFor="example-password-input" className="col-sm-2 col-form-label">Meeting title</label>
                      <div className="col-sm-4">
                        <input className="form-control" type="text" required name="meeting_title" defaultValue={dataMom.meeting_title} placeholder="Insert Title" id="example-password-input" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Meeting Summary</label>
                      <div className="col-sm-10">
                        <textarea  className="form-control" name="meeting_summary" rows={8} placeholder="Write Summary here..." cols={80} defaultValue={dataMom.meeting_summary}></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Attachment</label>
                      <div className="col-sm-10">
                        {
                          showExistFile()
                        }
                        <input type="file" name="file"  className="form-control" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">To <small>(for email to)</small></label>
                      <div className="col-sm-10">
                        <input type="text" name="in_to" className="form-control" value={typingTo} onChange={e => setTypingTo(e.target.value)} onKeyUp={onTypeToEmail} placeholder="Masukan to email" />
                        <div>
                          {
                            showToEmail()
                          }
                        </div>
                        <small>tekan koma (,) setelah menuliskan email</small>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">CC <small>(for email cc)</small></label>
                      <div className="col-sm-10">
                        <input type="text"  name="in_cc" className="form-control" value={typingCc} onChange={e => setTypingCc(e.target.value)} onKeyUp={onTypeCcEmail} placeholder="Masukkan cc email" />
                        <div>
                          {
                            showCcEmail()
                          }
                        </div>
                        <small>tekan koma (,) setelah menuliskan email</small>
                      </div>
                    </div>



                    <h4 className="mt-4 header-title">Mengetahui</h4>



                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Dibuat <small>(Optional)</small></label>
                          <input type="text" name="meeting_dibuat" required defaultValue={dataMom.meeting_dibuat} className="form-control" />
                          <small className="form-text text-muted">Thinkmatch</small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group ">
                          <label className="form-label">Mengetahui <small>(Optional)</small></label>
                          <input type="text" name="meeting_mengetahui" required defaultValue={dataMom.meeting_mengetahui} className="form-control" />
                          <small className="form-text text-muted">Client</small>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-12 text-right">
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
                          <button type="submit" className="btn btn-warning p-2" name="button">Save Changes</button>
                          )
                        }
                      </div>
                    </div>
                  </form>
                </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
  )
}

export function getServerSideProps(context){
  const id = context.params.id;
  return {
    props: {
      id:id
    }
  }
}
