import NewMeetupForm from "./../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const NewMeetup = () => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function addMeetupHandler(enteredMeetupData) {
    setIsLoading(true);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setIsLoading(true);

    route.push("/");
  }

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
