import { useState } from 'react';
import { gun } from '@services/gunService';
import {
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
} from '@ionic/react';
import { personAddOutline } from 'ionicons/icons';

interface InviteFormProps {
  eventId: string;
}

const InviteForm = ({ eventId }: InviteFormProps) => {
  const [pubKey, setPubKey] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleInvite = async () => {
    if (!pubKey) return;
    try {
      gun.get('events').get(eventId).get('invited').get(pubKey).put(true);
      gun.get('events').get(eventId).get('rsvps').get(pubKey).put('maybe');
      setPubKey('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to invite user:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleInvite();
  };

  return (
    <div>
      <IonItem>
        <IonLabel position="stacked">User Public Key</IonLabel>
        <IonInput
          value={pubKey}
          onIonInput={e =>
            setPubKey(String(e.detail.value ?? ''))
          }
          onKeyDown={handleKeyDown}
          placeholder="Insert the user pub key"
          clearInput
        />
      </IonItem>
      <IonButton
        color="primary"
        expand="block"
        onClick={handleInvite}
        disabled={!pubKey}
      >
        <IonIcon icon={personAddOutline} slot="start" />
        Invite User
      </IonButton>
      {success && (
        <IonText color="success">
          <p>User invited!</p>
        </IonText>
      )}
    </div>
  );
};

export default InviteForm;
