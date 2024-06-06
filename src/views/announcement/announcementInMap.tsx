import React, { useEffect } from "react";
import { Layout } from "../../components/layout/layout";

import { MapComponent } from "../../components/MapComponent/mapLeaflet";
import {
  fetchAllAnnouncementFromMap,
  getAnnFromMap,
} from "../../redux/slices/announcements";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Announment } from "../../types/types";
import { getBounds } from "../../redux/slices/defaultValues";

const AnnouncementMap = () => {
  const dispatch: AppDispatch = useDispatch();
  const announcements: Announment[] = useSelector(getAnnFromMap);
  const currentBounds = useSelector(getBounds);

  useEffect(() => {
    const getAnnoincements = async () => {
      if (currentBounds) {
        const prevBoundsMap = JSON.parse(currentBounds);
        const southWest = prevBoundsMap["southWest"];
        const northEast = prevBoundsMap["northEast"];
        dispatch(fetchAllAnnouncementFromMap({ southWest, northEast }));
      }
    };
    getAnnoincements();
  }, [currentBounds, dispatch]);

  useEffect(() => {
    console.log(announcements);
  }, [announcements]);

  return (
    <Layout>
      {announcements && <MapComponent announcements={announcements} />}
    </Layout>
  );
};

export default AnnouncementMap;
