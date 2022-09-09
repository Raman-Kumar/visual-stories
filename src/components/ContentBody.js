import { Tweet } from 'react-twitter-widgets'

const ContentBody = ({story, currentPage})=>{

    return (
        <div className="contentbody" style={{ whiteSpace : 'pre-line'}}>
            {story.text}

            {currentPage=== 0 ? <Tweet tweetId="1567192842921218048" />: ''}
        </div>
    )
}

export default ContentBody