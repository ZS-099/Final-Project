import React, {useEffect,useState} from "react"

const Feedback = ({message}) => {
    const [visible,setVisible] = useState(false)


useEffect(()=> {
    if(message){
        setVisible(true)
    }
   const timer = setTimeout(()=>{
       if(message)
       setVisible(false)     
   },2000)
   return () => clearTimeout(timer)

},[message])
console.log(message)
return <div style={visible?{display:'block'}:{display:'none'}} className="feedback">
        <p> {message}</p>
</div>
}

export default Feedback;