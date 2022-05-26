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
      images: [
        "https://i.picsum.photos/id/676/536/354.jpg?hmac=AUe7ybcPXLBm37YhZd49jpbOql4HORAAWX-WUPSOhjg",
      ],
      caption: "Nevermind just joking around",
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
      caption: "Nevermind just joking around",
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
