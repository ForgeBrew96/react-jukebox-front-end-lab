const TrackList = (props) => {
    const handleEditTrack = (track) => {
      props.updateSelected(track);
      props.handleFormView(true, track);
    };
  
    const handleDeleteTrack = (trackId) => {
      props.updateSelected(null);
      props.handleRemoveTrack(trackId);
    };
  
    const handlePlayTrack = (track) => {
      props.updateSelected(track);
    };
  
    const tracks = props.trackList.map((track) =>
      <li key={track._id}>
        <a href="#" onClick={() => handlePlayTrack(track)}>{track.title}</a>
        <button onClick={() => handlePlayTrack(track)}>Play</button>
        <button onClick={() => handleEditTrack(track)}>Edit</button>
        <button onClick={() => handleDeleteTrack(track._id)}>Delete</button>
      </li>
    );
  
    return (
      <div>
        <h1>Track List</h1>
        {!props.trackList.length ? <h2>No Tracks Yet!</h2> : <ul>{tracks}</ul>}
        <button onClick={() => props.handleFormView(true)}>
          {props.isFormOpen ? 'Close Form' : 'New Track'}
        </button>
      </div>
    );
  };
  
  export default TrackList;
  