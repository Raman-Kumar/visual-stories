function Navigation({stories, onTap, selected}){
    return (
        <div className="nav">
            {stories.map((story, index)=> 
                <span onClick={()=> {onTap(index)}} key={index} className={`titlebox ${index===selected ? 'selected' : 'unselected'}`}>{story.title}</span>
            )}
        </div>
    )
}
 
export default Navigation