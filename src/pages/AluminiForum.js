import React from "react";
import ForumCard from "../components/ForumCard";
import Styles from "./AlumniForum.module.css";
const DUMMY_POST_DATA = [
  {
    id: 1,
    user: {
      name: "Ben Tennyson",
      profile_image: require("./../assets/ben.png"),
    },
    post: {
      images: ["https://picsum.photos/536/354"],
      caption: {
        title: "Tile - Testing Postcard",
        description:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
    comments: [
      {
        user: {
          name: "name",
          profile_image: require("./../assets/ben.png"),
        },
        comment: "Hello Ben",
      },
      {
        user: {
          name: "name",
          profile_image: require("./../assets/ben.png"),
        },
        comment: "Hi Ben",
      },
    ],
  },
  {
    id: 1,
    user: {
      name: "Ben Tennyson",
      profile_image: require("./../assets/ben.png"),
    },
    post: {
      images: [
        "https://i.picsum.photos/id/676/536/354.jpg?hmac=AUe7ybcPXLBm37YhZd49jpbOql4HORAAWX-WUPSOhjg",
      ],
      caption: {
        title: "Tile - Testing Postcard",
        description:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
    comments: [
      {
        user: {
          name: "name",
          profile_image: require("./../assets/ben.png"),
        },
        comment: "Hello Ben",
      },
      {
        user: {
          name: "name",
          profile_image: require("./../assets/ben.png"),
        },
        comment: "Hi Ben",
      },
    ],
  },
];

function AlumniForum() {
  return (
    <div className={Styles.forum_container}>
      {DUMMY_POST_DATA.map((post) => (
        <ForumCard key={post.id} data={post} />
      ))}
    </div>
  );
}

export default AlumniForum;
