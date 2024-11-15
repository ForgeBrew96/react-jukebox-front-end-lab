const TrackList = (props) => {
    const tracks = props.trackList.map((track) =>
        <li key={track._id} onClick={ () => props.updatedSelected(track)}>
            <a href="#">{track.title}</a>

            <button onClick={''}>Play</button>
            <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
        <button onClick={() => props.handleRemoveTrack(props.selected)}>Delete</button>
        </li>
    );

    return(
        <div>
          <h1>Track List</h1>
          {!props.trackList.length ? <h2>No Tracks Yet!</h2> : <ul>{tracks}</ul>}

          <button onClick={props.handleFormView}>
              {props.isFormOpen ? 'Close Form' : 'New Track'}
          </button>
      </div>
    )
}

export default TrackList