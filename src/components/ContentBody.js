
const ContentBody = ({story, currentPege})=>{
    return (
        <div className="contentbody" style={{ whiteSpace : 'pre-line'}}>
            {story.text}
        </div>
    )
}

export default ContentBody