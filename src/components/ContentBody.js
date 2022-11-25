import { Tweet } from 'react-twitter-widgets'

const ContentBody = ({story, currentPage, onTrack})=>{

    const Intro = [
        {
            text :
            `
            I am Raman Kumar 🙂

            Works as a Developer at TagHive (Kotlin, Java, Andorid)
            Check out my  
            `
            , 
            seprator :
            `

            `
            , 
            open :
            `
            Contributed 300+ lines of code (C++, Ojective-C, Python) to at 
            PyTorch (a Machine Learing Framework) 

            for supoorting this code for apple GPU

            tensor_mps = tensor.to('mps')
            torch.meadian(tensor_mps) 
            torch.meadian(tensor_mps, dim=int, keepdim = bool) 

            Checkout my
            `
        }]

    return (
        <div className="contentbody" style={{ whiteSpace : 'pre-line'} } onClick={(target)=> {onTrack(currentPage, target.target)}}>

            {currentPage=== 0 ? <div  className="work" ><img className="imgAndroid" src="https://pbs.twimg.com/profile_images/1557751629327339521/oUgL20Qj_400x400.jpg" alt="pytorch" width="40" height="40" />  {Intro[0].text}</div>: ''}

            {currentPage=== 0 ? <div  className="linkedin">  <a className="linkedinLink" href="https://www.linkedin.com/in/ramankumar1998/" >Linkedin </a> </div>: ''}

            {currentPage=== 0 ? <div  className="seprater"> {Intro[0].seprator}</div>: ''}

            {currentPage=== 0 ? <div  className="open" > <img className="imgPyTorch"  src="https://pbs.twimg.com/profile_images/1306686545974362113/JYq2LGIA_400x400.jpg" alt="pytorch" width="40" height="40" />   {Intro[0].open} </div>: ''}

            {currentPage=== 0 ? <div  className="github" > <a className="githubLink" href="https://github.com/pytorch/pytorch/commits?author=Raman-Kumar" >Merged PR on Github</a> </div>: ''}

            {story.text}

            {currentPage=== 0 ? <Tweet  tweetId="1567192842921218048" />: ''}
        </div>
    )
}

export default ContentBody