import MeetupList from "./../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Next Meetup</title>
        <meta name="description" content="Meetup App with Nextjs" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }

export async function getStaticProps() {
  //Fetch data from API

  const client = await MongoClient.connect("mongodb+srv://maher:DFwgblIB41puhFz5@cluster0.y0spnm6.mongodb.net/meetup?retryWrites=true&w=majority");

  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const meetup = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetup.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
