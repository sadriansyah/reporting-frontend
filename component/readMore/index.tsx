import React, {useState, useEffect} from "react";

const ReadMoreReadLess = (props) => {
  // console.log(props)
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(3);

  useEffect(() =>  {
    setItems(props.data)
  },[])

  console.log(items)

  return (
    <div>
      Hello
    </div>
  )
}

export default ReadMoreReadLess;