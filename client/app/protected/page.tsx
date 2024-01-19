import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ContentPageGuttering from "../_components/ContentPageGuttering";
import moment from "moment";

async function getServerSideSessionData() {
  const session = await getServerSession(authOptions);
  const message =
    "Hello from the server! This function ran server side at: " +
    moment().format("MMMM Do YYYY, h:mm:ss a");
  return { session, message };
}

export default async function Page() {
  const { session, message } = await getServerSideSessionData();
  if (!session) return null;
  return (
    <ContentPageGuttering>
      <p className="mt-24 text-2xl">You Are Here: /protected</p>
      <p className="my-6 text-5xl">
        This is a <span className="text-orange-600">Protected</span> Route
      </p>
      <p className="text-xl">
        This is not a public page and is server-side validated by both
        middleware.ts and the page props itself.
      </p>
      <p className="mt-24 text-2xl">Server-side Session Data</p>
      <p className="italic text-yellow-500">
        {JSON.stringify(session, null, 4)}
      </p>
      <p className="mt-24 text-2xl">
        Server-side Rendering/Data Fetching Example
      </p>
      <p className="italic text-yellow-500">{message}</p>
    </ContentPageGuttering>
  );
}
