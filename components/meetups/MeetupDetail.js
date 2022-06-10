import React from "react";
import { Fragment } from "react";
import style from "./MeetupDetail.module.css";

const MeetupDetail = (prop) => {
  return (
    <section className={style.detail}>
      <img src={prop.image} alt="photo" />
      <h1>{prop.title}</h1>
      <address>{prop.address}</address>
      <p>{prop.description}</p>
    </section>
  );
};

export default MeetupDetail;
