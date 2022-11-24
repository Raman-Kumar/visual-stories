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
            open :
            `
            Contributed 300+ line of code to at 
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

            {currentPage=== 0 ? <div  className="work" >{Intro[0].text}</div>: ''}

            {currentPage=== 0 ? <div  className="linkedin"> <a className="linkedinLink" href="https://www.linkedin.com/in/ramankumar1998/" >Linkedin </a> </div>: ''}

            {currentPage=== 0 ? <div  className="open" > {Intro[0].open} </div>: ''}

            {currentPage=== 0 ? <div  className="github" > <a className="githubLink" href="https://github.com/pytorch/pytorch/commits?author=Raman-Kumar" >Merged PR on Github</a> </div>: ''}

            {story.text}

            {currentPage=== 0 ? <Tweet  tweetId="1567192842921218048" />: ''}
        </div>
    )
}

export default ContentBody