import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';

import Home from "./components/Home";
import TrackList from "./components/TrackList";
import TrackDetail from "./components/NowPlaying";
import TrackForm from "./components/TrackForm";

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await trackService.index();

        if (tracks.error) {
          throw new Error(tracks.error);
        }

        setTrackList(tracks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTracks();
  }, []);

  const updateSelected = (track) => {
    setSelected(track);
  };

  const handleFormView = (isOpen, track = null) => {
    setSelected(track);
    setIsFormOpen(isOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.error) {
        throw new Error(newTrack.error);
      }

      setTrackList([newTrack, ...trackList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);

      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }

      const updatedTrackList = trackList.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );

      setTrackList(updatedTrackList);
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    try {
      const deleteResponse = await trackService.deleteTrack(trackId);
      if (deleteResponse && deleteResponse.error) {
        throw new Error(deleteResponse.error);
      }

      setTrackList((prevTrackList) => {
        const updatedTrackList = prevTrackList.filter((t) => t._id !== trackId);
        return updatedTrackList;
      });
      setSelected(null); 
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Home />
      <TrackList 
        selected={selected}
        trackList={trackList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        handleRemoveTrack={handleRemoveTrack}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm 
          handleAddTrack={handleAddTrack}
          handleUpdateTrack={handleUpdateTrack}
          selected={selected}
        />
      ) : (
        <TrackDetail
          selected={selected}
        />
      )}
    </>
  );
};

export default App;
