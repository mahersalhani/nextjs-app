import React, { Fragment } from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        //
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb+srv://maher:DFwgblIB41puhFz5@cluster0.y0spnm6.mongodb.net/meetup?retryWrites=true&w=majority");

  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const meetup = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetup.map((meetup) => ({
      params: { meetupID: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //Fetch data from API

  const meetupId = context.params.meetupID;

  const client = await MongoClient.connect("mongodb+srv://maher:DFwgblIB41puhFz5@cluster0.y0spnm6.mongodb.net/meetup?retryWrites=true&w=majority");

  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
