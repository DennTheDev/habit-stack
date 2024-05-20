import React,{useState} from 'react'
export default ()=>{
    const [time,setTime]=useState(Date.now());
    return (
        <>{time}</>
    );
}