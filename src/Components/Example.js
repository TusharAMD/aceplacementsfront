import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Example() {
  const [open, setOpen] = useState(false);
  let  array = [1,2,3]
  return (
    <>
    {array.map(()=>{
        return(<>
        <div style={{display:"flex",flexDirection:"column"}}>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>
      <Collapse in={open}>
        <div style={{backgroundColor:"white"}} id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </div>
            </>)
    })}
    </>
  );
}


export default Example