import MediaQuery from "react-responsive";
import { Image } from "antd";

type Props = {
  url?: string;
};

export const ImageProfile= ({ url }: Props) => {
  return (
    <div>
      <MediaQuery maxWidth={500}>
        <Image
          src={url || "https://cdn-icons-png.flaticon.com/512/60/60422.png"}
          style={{ width: "70px", objectFit: "contain" }}
        />
      </MediaQuery>
      <MediaQuery minWidth={501} maxWidth={920}>
        <Image
          src={url || "https://cdn-icons-png.flaticon.com/512/60/60422.png"}
          style={{ width: "95px", objectFit: "contain" }}
        />
      </MediaQuery>
      <MediaQuery minWidth={921} maxWidth={1200}>
      <Image
          src={url || "https://cdn-icons-png.flaticon.com/512/60/60422.png"}
          style={{ width: "150px", objectFit: "contain" }}
        />
      </MediaQuery>
      <MediaQuery minWidth={1201}>
      <Image
          src={url || "https://cdn-icons-png.flaticon.com/512/60/60422.png"}
          style={{ width: "180px", objectFit: "contain" }}
        />
      </MediaQuery>
    </div>
  );
};

// style={{ width: "200px", objectFit: "contain" }}
