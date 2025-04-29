import { useState } from "react";
import { gun } from "@services/gunService";

interface InviteFormProps {
  eventId: string;
}

const InviteForm = ({ eventId }: InviteFormProps) => {
  const [pubKey, setPubKey] = useState();
  const handleInvite = async () => {
    if (!pubKey) return;
    try {
      gun.get("events").get(eventId).get("invited").get(pubKey).put(true);
      gun.get("events").get(eventId).get("rsvps").get(pubKey).put("maybe");
      setPubKey(null);
    } catch (error) {
      console.error("failed to invite user");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={pubKey}
        onChange={(e) => setPubKey(e.target.value)}
        placeholder="Insert the user pub key"
      />
      <button onClick={handleInvite}>Invite User</button>
    </div>
  );
};

export default InviteForm;
