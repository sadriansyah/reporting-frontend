import { getData } from '../../services/helpers';
import { useEffect, useState } from 'react';
function CardImage(props) {
  const [isReady, setIsReady] = useState(false);
  const [color, setColor] = useState('primary');
  const [icon, setIcon] = useState('mdi mdi-cube-outline');
  const [number, setNumber] = useState(0);
  const [header, setHeader] = useState('header');
  const [footer, setFooter] = useState('footer');
  useEffect(() => {
    setColor(props.color);
    setIcon(props.icon);
    setHeader(props.header);
    setFooter(props.footer);
    fetchdata();
  },[]);

  const fetchdata = async () => {
    setIsReady(false);
    const res = await getData(props.link);
    if(res.status ==200){
      setNumber(res.result);
    }
    setIsReady(true);
  }

  const showdata = () => {
    return (
      !isReady?(
        <h3 className="mt-4">
          <div className={`spinner-border text-${color}`} role="status">
              <span className="sr-only">Loading...</span>
            </div>
        </h3>
      )
      :
      (
        <>
        <h3 className="mt-4">
          {number}
        </h3>
        <div className="progress mt-4" style={{height: '4px'}}>
          <div className={`progress-bar bg-${color}`} role="progressbar" style={{width: '100%'}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
        </div>
        <p className="text-muted mt-2 mb-0">{footer}<span className="float-right">{number}</span></p>
        </>
      )
    )
  }


  return (
    <div className="card">
      <div className="card-heading p-4">
        <div className="mini-stat-icon float-right">
          <i className={`${icon} text-white bg-${color}`} />
        </div>
        <div>
          <h5 className="font-16">{header}</h5>
        </div>
        {
          showdata()
        }
      </div>
    </div>
  )
}

export default CardImage
