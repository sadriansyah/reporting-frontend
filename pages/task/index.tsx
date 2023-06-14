import Dashboard from '../../component/Master/dashboard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loader from '../../component/loader/loader';
import ReadMoreReadLess from '../../component/readMore';

export default function ListTask(props) {
  const {data} = props;
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(props.date);
  const [allOSB, setAllOSB] = useState([]);
  const [mxh, setMxh] = useState('');

  useEffect(() => {
    onLoad();
    setDate(date)
    setList(data);
    setIsLoading(false);
  },[allOSB])

  const showDate = (date) => {
    date = new Date(date)
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var month2 = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var tanggal = day + ' ' + month2[month] + ' ' + year;
    return tanggal;
  }
  
  const onLoad = () => {
    let text = document.getElementsByClassName("task-text");
    setAllOSB(text) ;
  
  if (allOSB.length > 0) {
    let mh = window.getComputedStyle(allOSB[0]).getPropertyValue('max-height');
    mh = parseInt(mh.replace('px', ''));
    setMxh(mh);
    
    // Add read-more button to each OSB section
    for (var i = 0; i < allOSB.length; i++) {
      var el = document.createElement("button");
      el.innerHTML = "Read More";
      el.setAttribute("type", "button");
      el.setAttribute("class", "read-more hid");
      
      insertAfter(allOSB[i], el);
    }
  }

  // Add click function to buttons
  var readMoreButtons = document.getElementsByClassName("read-more");
  for (var i = 0; i < readMoreButtons.length; i++) {
    readMoreButtons[i].addEventListener("click", function() { 
      revealThis(this);
    }, false);
  }
  
  // Update buttons so only the needed ones show
  updateReadMore();
  }

  const updateReadMore = () => {
    if (allOSB.length > 0) {
      for (var i = 0; i < allOSB.length; i++) {
        if (allOSB[i].scrollHeight > mxh) {
          if (allOSB[i].hasAttribute("style")) {
            updateHeight(allOSB[i]);
          }
          allOSB[i].nextElementSibling.className = "read-more";
        } else {
          allOSB[i].nextElementSibling.className = "read-more hid";
        }
      }
    }
  }

  const revealThis = (current) =>{
    var el = current.previousElementSibling;
    if (el.hasAttribute("style")) {
      current.innerHTML = "Read More";
      el.removeAttribute("style");
    } else {
      updateHeight(el);
      current.innerHTML = "Show Less";
    }
  }

  const updateHeight = (el) => {
    el.style.maxHeight = el.scrollHeight + "px";
  }

  const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }


  const showList = () =>{
    return(
      isLoading?
      (
        <Loader/>
      )
      :
      (
        <div className='row m-t-30'>
          {
            list?.map((row,i) =>{
              return(
                <div className='col-lg-4' key={i}>
                <div className='card faq-box border-primary'>
                  <div className='card-body'>
                    <h5 className='text-primary'>{row.user_name}</h5>
                    <div className='task-text'>
                      <div>
                      </div>
                      <h5 className='font-16 mb-3 mt-4'>
                        Done:
                      </h5>
                      <div className='white-space mb-0'>
                          {row.done}
                      </div>
                      <h5 className='font-16 mb-3 mt-4'>
                        Doing:
                      </h5>
                      <div className='white-space mb-0'>
                        {row.doing}
                      </div>
                      <h5 className='font-16 mb-3 mt-4'>
                        To Do:
                      </h5>
                      <div className='white-space mb-0'>
                        {row.to_do}
                      </div>
                      <h5 className='font-16 mb-3 mt-4'>
                        Blocker:
                      </h5>
                      <div className='white-space mb-0'>
                        {row.blocker}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>
        )
      )
  }



  return (
    <Dashboard pageTitle='Daily Task | Thinkmatch Report App'>
      <div className='content'>
        <div className='container-fluid'>
          <div className='page-title-box'>
            <div className='row align-items-center'>
              <div className='col-sm-6'>
                <h4 className='page-title'>Document</h4>
              </div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-right'>
                  <li className='breadcrumb-item'>
                    <Link href='/'>Thinkmatch</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link href='#'>Document</Link>
                  </li>
                  <li className='breadcrumb-item active'>Task</li>
                </ol>
              </div>
              <div className='col-sm-4'>

              </div>
              <div className='col-sm-4 text-center'>
                <h5>Daily Task : {showDate(date)}</h5>
              </div>
              <div className='col-sm-4 text-right'>
                <Link
                  href='/task/list'
                  className='btn btn-secondary'
                  style={{ marginRight: '12px' }}
                >
                  {' '}
                  <i className='icon-paper-sheet'></i> List Task
                </Link>
                <Link href='/task/create-task' className='btn btn-primary'>
                  {' '}
                  <i className='fa fa-plus'></i> Create Task
                </Link>
              </div>
              <div className='col-sm-12'>
                <form>
                  <div className="form-group row">
                    <div className='col-sm-4'>

                    </div>
                    <div className="col-sm-4" style={{textAlign:"center"}}>
                        <input className="form-control" type="date" name="date" required defaultValue={date} style={{textAlign:"center"}}/>
                    </div>
                    <div className='col-sm-4'>
                      <button type="submit" className="btn btn-primary p-2">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {
            showList()
          }
        </div>
      </div>
    </Dashboard>
  );
}

export async function getServerSideProps(context) {
  const dateNow = new Date().toISOString().slice(0, 10);
  const nowDate = context.query.date || dateNow
  const link = process.env.API_LINK + 'task?date=' + nowDate;
  const res = await fetch(link);
  const data = await res.json();
  return {
    props: {
      data: data,
      date: nowDate
    },
  };
}
