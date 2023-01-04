import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { atcb_action } from 'add-to-calendar-button';

 

function WatchList() {
    const [open, setOpen] = useState([])
    const [array,setArray] = useState([])
    const [open1,setOpen1] = useState(false)
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading  } = useAuth0();
    const notify = (msg) => toast(msg);
    useEffect(() => {
        //  axios.get(`https://aceplacementsback.onrender.com/watchlistcompanies`)
        axios.post(`https://aceplacementsback.onrender.com/watchlistcompanies`,{user:user})
        //axios.post(`http://127.0.0.1:5000/watchlistcompanies`,{user:user})
        .then(res => {
            const data = res.data;
            setArray(data.data);
            setOpen(Array(data.data.length).fill(false))
            console.log(res.data)
            //console.log(res.data)
            //console.log(data.data.length)
            //console.log(Array(data.data.length).fill(false))

        })
      }, [isAuthenticated]);

    function onRemoveWatchHandler(item){
        console.log(item)
        //axios.post(`http://127.0.0.1:5000/watchlistaddremove`,{nameofcompany:item,task:"remove",user:user})
        axios.post(`https://aceplacementsback.onrender.com/watchlistaddremove`,{nameofcompany:item,task:"remove",user:user})
        .then(res => {
            console.log(res.data.data)
            notify(res.data.data)
        })
    }
    
    return (
        <div className="list">

            <div>
                <br />
                <div style={{margin:"10px", display: "flex", flexDirection: "column", justifyContent: "center", color: "black", borderRadius: "10px", backgroundImage: "url('https://i.ibb.co/GpdRdy7/image.png')", backgroundColor: "white", height: "200px" }}>
                    <div className='headingcenter'>Unofficial ACE Placements</div>
                    {/*<img className='headingbanner' src='https://i.ibb.co/GpdRdy7/image.png'></img>*/}
                </div>
                <br />
                <Companies />
            </div>
        </div>
    )
    function Companies() {


        let currentStatusIndicator = {"Registration Open":"#33FF57","Ongoing":"#33C8FF  ","Completed":"#880808"}

        /*let array = [{ 
            "Name": "Lenden Club", 
            "Package": "7", 
            "DatePosted": "21th Nov 2022", 
            "Deadline": "22nd Nov 2022", 
            "Logo": "https://www.lendenclub.com/wp-content/uploads/2020/09/LDC_Light.png",
            "Status":"Completed",
            "Discord":"https://discord.gg/dffp5Cvyqj", 
            "Updates": {
                "1": {"msg": "Registration Phase", "link": "https://classroom.google.com/c/NDk2MjI5MTMyMTIy/p/NTA3NDQyMDUzODk3/details"},
                "2":{"msg":"Shortlisted Students are displayed on Classroom","link":"https://classroom.google.com/c/NDk2MjI5MTMyMTIy/p/NTA3NTE3MjE1ODQx/details"},
                "3":{"msg":"Shortlisted Students are displayed on Classroom (2)","link":"https://classroom.google.com/c/NDk2MjI5MTMyMTIy/p/NTQwODI4ODkyODYw/details"},
                "4":{"msg":"Interview Call","link":"https://classroom.google.com/c/NDk2MjI5MTMyMTIy/p/NTA5MDU3ODg3MTE0/details"},
                "5":{"msg":"Final Selection Done","link":""},
                } 
        }]*/

        return (<>
            {array.map((item, index) => {


                return (
                    <>
                        <Card style={{backgroundColor:"rgba(255,255,255,0.7)", margin:"10px"}}>
                            <Card.Img style={{ width: "10em", margin: "5px"}} variant="top" src={item.Logo} />
                            <Card.Body style={{ color: "black" }}>

                                <Card.Title>{item.Name}</Card.Title>
                                <Card.Text style={{fontFamily: "'Poppins', sans-serif"}}>
                                    
                                    
                                    {/*item.Updates[item.Updates.length - 1]*/}
                                    {/*console.log(`${item.Updates[0]}`)*/}
                                    {/*console.log(`${Math.max(...Object.keys(item.Updates))}`)*/}
                                    
                                    <hr/>
                                    <div style={{backgroundColor:"#ccffff"}}>{item.Eligibility}</div>
                                    <div><u>Latest Update:</u></div>
                                    <div style={{border:"2px dashed black"}}>
                                    {item.Updates[Math.max(...Object.keys(item.Updates))]["msg"]}<br/>
                                    <a href={item.Updates[Math.max(...Object.keys(item.Updates))]["link"]}>Classroom Link</a>
                                    </div>
                                </Card.Text>
                                
                                <div className='carddiv'>

                                    <div>Date Posted: {item.DatePosted}</div>
                                    <div
                                    onClick={e => {
                                        var temp = item.Deadline.split(" ")

                                        var mymap = {"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"}
                                        var dateString = `${temp[3]}-${mymap[temp[2]]}-${temp[1]}`
                                        console.log(dateString)
                                        atcb_action({
                                          name: `Reminder for ${item.Name}`,
                                          startDate: `${dateString}`,
                                          endDate: `${dateString}`,
                                          startTime:`${temp[4]}`,
                                          endTime:`${temp[4]}`,
                                          options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
                                          timeZone: "Asia/Kolkata",
                                          iCalFileName: "Reminder-Event",
                                        });
                                      }}
                                    >Deadline: {item.Deadline} <span class="material-symbols-outlined"> event </span> </div>
                                    <div>Package: <br/> <span style={{color:"white",border:"2px dotted #012522",backgroundColor:"#016b62",borderRadius:"100%",padding:"2px",margin:"5px"}}>{item.Package} LPA</span></div>
                                </div>
                                <br />
                                <div className='carddiv'>
                                    <div style={{backgroundColor:"white"}}>Status: <span style={{ color: currentStatusIndicator[item["Status"]] }}>{item["Status"]}</span></div>
                                    <div>Join <a href={item["Discord"]}><img style={{ width: "2em" }} src='https://cdn-icons-png.flaticon.com/512/2111/2111370.png'></img></a> Channel</div>
                                    <div onClick={()=>{onRemoveWatchHandler(item.Name)}}>Remove from WatchList<span  class="material-symbols-outlined">do_not_disturb_on</span></div>
                                </div>
                                <br />

                                <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header >See all Updates</Accordion.Header>
                                    <Accordion.Body>
                                    <Updatesnotifier item={item} />
                                    </Accordion.Body>
                                </Accordion.Item>
                                </Accordion>

                            </Card.Body>
                        </Card>
                        <br />
                    </>
                )

            })}
        <ToastContainer
        theme="dark"
        />
        </>)
    }

    function Updatesnotifier(props){
        let updatearray = props.item.Updates;
        //console.log(updatearray)
        return(<>
        <br/>
        <ol>
        {/*JSON.stringify(props.item.Updates)*/}
        {
            Object.keys(updatearray).map((item,index)=>{
                return(
                <>
                {/*JSON.stringify(item)*/}
                
                <li className='eachupdate'>
                    <div>{item}</div>
                    <div>{updatearray[item]["msg"]}</div>
                    <div><a href={updatearray[item]["link"]}>Classroom Link</a></div>
                </li>
     
                </>
                )
            })
        }
        </ol>
        </>)
    }

    function onShowUpdateHandler(e,index){
        //console.log(open[index])
        let tempopen = open
        tempopen[index] = !tempopen[index]
        setOpen(tempopen)
    }
}
export default WatchList