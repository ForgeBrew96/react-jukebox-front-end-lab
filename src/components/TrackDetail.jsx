const TrackDetails = (props) => {
    if (!props.selected)
        return (
            <h2>NO DETAILS</h2>
        );

    return(
        <div>
        <h1>{props.selected.title}</h1>
        <h2>Artist: {props.selected.artist}</h2>
        <p>{`${props.selected.title} is a band of the ages!`}</p>
      </div>
    )
}

export default TrackDetails