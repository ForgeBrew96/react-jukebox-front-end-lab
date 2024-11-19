const NowPlaying = (props) => {
    if (!props.selected)
        return (
            <h2>Nothing playing Right now! Click play on any song to play your next track!</h2>
        );

    return(
        <div>
        <h1>Now playing: {props.selected.title}</h1>
        <h2>By Artist: {props.selected.artist}</h2>
      </div>
    )
}

export default NowPlaying