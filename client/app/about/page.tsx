import ContentPageGuttering from "../_components/ContentPageGuttering";
import ConnectedClientData from "../_components/ConnectedClientData";

export default function Page() {
  return (
    <ContentPageGuttering>
      <p className="mt-24 text-2xl">You are here: /about</p>
      <p className="my-6 text-5xl">
        This is an <span className="text-green-600">Unprotected</span> Route
      </p>
      <p className="text-xl">
        This is a public page accessible regardless of whether you have an
        active session or wallet connected.
      </p>
      <ConnectedClientData />
    </ContentPageGuttering>
  );
}
