import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from "react";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Admin(){

    function createNotification(type) {
        return () => {
          switch (type) {
            case 'NewEntryAdded':
              NotificationManager.info('New Entry Added');
              break;
            case 'EntryUpdated':
              NotificationManager.info('Entry Updated');
              break;
          }
        }};

    const { loginWithRedirect, logout, user, isAuthenticated, isLoading  } = useAuth0();

    const [companieslist,setCompanieslist] = useState([])
    useEffect(() => {
        //axios.get(`https://aceplacementsback.onrender.com/updateentrylist`)
        axios.get(`http://127.0.0.1:5000/updateentrylist`)
        .then(res => {
            const data = res.data;
            setCompanieslist(res.data.data);
            //console.log(res.data)
        })
      }, []);

    /* New Inputs state */
    const[companyname,setCompanyName] = useState("");
    const[packages,setPackage] = useState("");
    const[eligibility,setEligibility] = useState("");
    const[dateposted,setDateposted] = useState("");
    const[deadline,setDeadline] = useState("");
    const[logo,setLogo] = useState("");
    const[discord,setDiscord] = useState("");
    const[status,setStatus] = useState("");
    const[message,setMessage] = useState("");
    const[link,setLink] = useState("");
    /* */

    /* Update Inputs state */
    const[ucompanyname,setUCompanyName] = useState("");
    const[umessage,setUMessage] = useState("");
    const[ulink,setULink] = useState("");
    /* */

    

    function onNewHandler(){
        axios.post("https://aceplacementsback.onrender.com/newentry",{companyname:companyname,packages:packages,dateposted:dateposted,deadline:deadline,logo:logo,discord:discord,status:status,message:message,link:link,eligibility:eligibility})
        //axios.post("http://127.0.0.1:5000/newentry",{companyname:companyname,packages:packages,dateposted:dateposted,deadline:deadline,logo:logo,discord:discord,status:status,message:message,link:link,eligibility:eligibility})
        .then(res=>{
            const data = res.data
            console.log(res.data)
        }
        )
    }

    function onUpdateHandler(){
        
        axios.post("https://aceplacementsback.onrender.com/updateentry",{ucompanyname:ucompanyname,umessage:umessage,ulink:ulink})
        //axios.post("http://127.0.0.1:5000/updateentry",{ucompanyname:ucompanyname,umessage:umessage,ulink:ulink})
        .then(res=>{
            
            const data = res.data;
            console.log(res.data);
        }
        )
    }

    
    if(isAuthenticated && user.email=="atharvaplacementsunofficial@gmail.com"){
    return(
    <div className="admindiv">

        <NotificationContainer></NotificationContainer>
        <br/>
            <div style={{fontSize:"2em",backgroundColor:"white", border:"2px solid black", borderRadius:"10px", marginBottom:"10px", padding:"2px"}}>New Entry</div>
        
            <div className="NewEntry">
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control onChange={(e)=>{setCompanyName(e.target.value)}} placeholder="Company Name" />
                <Form.Label>Package</Form.Label>
                <Form.Control onChange={(e)=>{setPackage(e.target.value)}} placeholder="Package" />
                <Form.Label>Eligibility</Form.Label>
                <Form.Control onChange={(e)=>{setEligibility(e.target.value)}} placeholder="Eligibility" />
                <Form.Label>Date Posted</Form.Label>
                <Form.Control type="datetime-local" onChange={(e)=>{setDateposted(e.target.value)}} placeholder="Date Posted" />
                <Form.Label>Deadline</Form.Label>
                <Form.Control type="datetime-local" onChange={(e)=>{setDeadline(e.target.value)}} placeholder="Deadline" />
                <Form.Label>Logo</Form.Label>
                <Form.Control onChange={(e)=>{setLogo(e.target.value)}} placeholder="Logo" />
                <Form.Label>Status</Form.Label>
                <Form.Select onChange={(e)=>{setStatus(e.target.value)}} >
                    <option>Select a value here</option>
                    <option value="Registration Open">Registration Open</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                </Form.Select>
                <Form.Label>Discord</Form.Label>
                <Form.Control onChange={(e)=>{setDiscord(e.target.value)}} placeholder="Discord" />
                <Form.Label>Update</Form.Label>
                <Form.Control onChange={(e)=>{setMessage(e.target.value)}} placeholder="Message" />
                <Form.Control onChange={(e)=>{setLink(e.target.value)}} placeholder="Link" />


            </Form.Group>

           
            <Button onClick={()=>{onNewHandler();console.log({companyname,packages,dateposted,deadline,logo,discord,status,message,link})}} variant="primary" >
                Submit New Entry
            </Button>
            {/*<Button onClick={createNotification('EntryUpdated')}></Button>*/}
            </Form>
        </div>
        <br/>

        <div style={{fontSize:"2em",backgroundColor:"white", border:"2px solid black", borderRadius:"10px", marginBottom:"10px", padding:"2px"}}>Update Entry</div>
        <div className="UpdateEntry">
        
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Select onChange={(e)=>{setUCompanyName(e.target.value)}} >
                        <option>Select a value here</option>
                        {companieslist.map((item,index)=>{
                            return(<>
                            <option>{item}</option>
                            </>)
                        })}
                    </Form.Select>

                    <Form.Label>New Update</Form.Label>
                    <Form.Control onChange={(e)=>{setUMessage(e.target.value)}} placeholder="Message" />
                    <Form.Control onChange={(e)=>{setULink(e.target.value)}} placeholder="Link" />

                </Form.Group>

            
                <Button onClick={()=>{onUpdateHandler();console.log({companyname,packages,dateposted,deadline,logo,discord,status,message,link});}} variant="primary" >
                    Update Entry
                </Button>
                
                
            </Form>
        </div>
    </div>
    )
    }
    else if(isAuthenticated){
        return(
            <div>
                <img src="https://media.baamboozle.com/uploads/images/113315/1632237721_46554_gif-url.gif"></img>
            </div>
        )
    }

    
}
export default Admin