import React, { useEffect } from "react";
import { Layout } from "../../components/layout/layout";

import { MapComponent } from "../../components/MapComponent/mapLeaflet";
import {
  announcementsInCity,
  fetchAnnouncements,
} from "../../redux/slices/announcements";
import { useDispatch, useSelector } from "react-redux";

const AnnouncementMap = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const getAnnoincements = async () => {
      dispatch(fetchAnnouncements());
    };
    getAnnoincements();
  }, []);

  const announcements = useSelector(announcementsInCity);
  return (
    <Layout>
      {announcements && <MapComponent announcements={announcements} />}
    </Layout>
  );
};

export default AnnouncementMap;
