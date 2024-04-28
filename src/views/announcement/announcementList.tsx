import { AnnouncementCard } from "../../components/Cards/announcementCard";
import { Announment } from "../../types/types";

type Props = {
  announcements?: Announment[] | [];
};

const AnnouncementList = ({ announcements }: Props) => {
  return (
    <div
      style={{
        height: "65%",
        width: "100%",
      }}
    >
      {!announcements || announcements?.length < 0
        ? "Объявлений нет"
        : announcements?.map((e) => <AnnouncementCard announcement={e} />)}
    </div>
  );
};

export default AnnouncementList;
