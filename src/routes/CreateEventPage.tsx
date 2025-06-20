import { useState } from 'react';
import {
  IonInput,
  IonTextarea,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
  IonItem,
  IonCheckbox,
  IonIcon,
  IonSpinner,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  useIonRouter,
} from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import {
  calendarOutline,
  locationOutline,
  peopleOutline,
  addOutline,
  closeOutline,
  timeOutline,
  giftOutline,
} from 'ionicons/icons';

interface ItemInput {
  id: string;
  name: string;
  quantity: number;
}

const CreateEventPage: React.FC = () => {
  const { createEvent } = useEvents();
  const router = useIonRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [isPrivate, setIsPrivate] = useState(false);
  const [itemInputs, setItemInputs] = useState<ItemInput[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItemInput = () => {
    setItemInputs([
      ...itemInputs,
      { id: crypto.randomUUID(), name: '', quantity: 1 },
    ]);
  };

  const removeItemInput = (id: string) => {
    setItemInputs(itemInputs.filter(item => item.id !== id));
  };

  const updateItemInput = (
    id: string,
    field: keyof ItemInput,
    value: string | number
  ) => {
    setItemInputs(
      itemInputs.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const startDateTime = isAllDay
        ? new Date(startDate).toISOString()
        : new Date(`${startDate}T${startTime}`).toISOString();

      const endDateTime = isAllDay
        ? new Date(endDate).toISOString()
        : new Date(`${endDate}T${endTime}`).toISOString();

      await createEvent({
        title,
        description,
        location,
        capacity,
        isPrivate,
        startDateTime,
        endDateTime,
        isAllDay,
        itemInputs,
      });
      router.push('/tabs/home', 'root');
    } catch (err) {
      console.error('Failed to create event:', err);
      setError('Failed to create event. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Create a New Event</IonCardTitle>
        <IonText color="medium">
          <p style={{ marginTop: 8, marginBottom: 0 }}>
            Plan your event with all the details
          </p>
        </IonText>
      </IonCardHeader>
      <IonCardContent>
        {error && (
          <div style={{ marginBottom: 16, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: 12, color: '#B91C1C', fontSize: 14 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <IonText color="dark">
            <h2 style={{ fontSize: 18, fontWeight: 500, marginTop: 24, marginBottom: 8 }}>Basic Info</h2>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonLabel position="stacked">
                  Event Title <IonText color="danger">*</IonText>
                </IonLabel>
                <IonInput
                  value={title}
                  onIonChange={e => setTitle(e.detail.value!)}
                  placeholder="e.g., Summer Picnic"
                  required
                />
              </IonCol>
              <IonCol size="12">
                <IonLabel position="stacked">
                  Description <IonText color="danger">*</IonText>
                </IonLabel>
                <IonTextarea
                  value={description}
                  onIonChange={e => setDescription(e.detail.value!)}
                  placeholder="Describe your event..."
                  required
                  autoGrow
                />
              </IonCol>
              <IonCol size="12">
                <IonLabel position="stacked">
                  Location <IonText color="danger">*</IonText>
                </IonLabel>
                <IonInput
                  value={location}
                  onIonChange={e => setLocation(e.detail.value!)}
                  placeholder="e.g., Central Park"
                  required
                  clearInput
                >
                  <IonIcon icon={locationOutline} slot="start" />
                </IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Date & Time */}
          <IonText color="dark">
            <h2 style={{ fontSize: 18, fontWeight: 500, marginTop: 32, marginBottom: 8 }}>Date & Time</h2>
          </IonText>
          <IonItem lines="none">
            <IonCheckbox
              checked={isAllDay}
              onIonChange={e => setIsAllDay(e.detail.checked!)}
              slot="start"
            />
            <IonLabel>All-day event</IonLabel>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonLabel position="stacked">
                  Start Date <IonText color="danger">*</IonText>
                </IonLabel>
                <IonInput
                  type="date"
                  value={startDate}
                  onIonChange={e => setStartDate(e.detail.value!)}
                  required
                >
                  <IonIcon icon={calendarOutline} slot="start" />
                </IonInput>
              </IonCol>
              {!isAllDay && (
                <IonCol size="12" sizeMd="6">
                  <IonLabel position="stacked">
                    Start Time <IonText color="danger">*</IonText>
                  </IonLabel>
                  <IonInput
                    type="time"
                    value={startTime}
                    onIonChange={e => setStartTime(e.detail.value!)}
                    required
                  >
                    <IonIcon icon={timeOutline} slot="start" />
                  </IonInput>
                </IonCol>
              )}
              <IonCol size="12" sizeMd="6">
                <IonLabel position="stacked">
                  End Date <IonText color="danger">*</IonText>
                </IonLabel>
                <IonInput
                  type="date"
                  value={endDate}
                  onIonChange={e => setEndDate(e.detail.value!)}
                  required
                >
                  <IonIcon icon={calendarOutline} slot="start" />
                </IonInput>
              </IonCol>
              {!isAllDay && (
                <IonCol size="12" sizeMd="6">
                  <IonLabel position="stacked">
                    End Time <IonText color="danger">*</IonText>
                  </IonLabel>
                  <IonInput
                    type="time"
                    value={endTime}
                    onIonChange={e => setEndTime(e.detail.value!)}
                    required
                  >
                    <IonIcon icon={timeOutline} slot="start" />
                  </IonInput>
                </IonCol>
              )}
            </IonRow>
          </IonGrid>

          {/* Event Details */}
          <IonText color="dark">
            <h2 style={{ fontSize: 18, fontWeight: 500, marginTop: 32, marginBottom: 8 }}>Event Details</h2>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonLabel position="stacked">Capacity</IonLabel>
                <IonInput
                  type="number"
                  min="0"
                  value={capacity === 0 ? '' : capacity}
                  onIonChange={e => setCapacity(parseInt(e.detail.value!) || 0)}
                  placeholder="0 for unlimited"
                >
                  <IonIcon icon={peopleOutline} slot="start" />
                </IonInput>
                <IonText color="medium" style={{ fontSize: 12 }}>
                  Enter 0 for unlimited attendees
                </IonText>
              </IonCol>
              <IonCol size="12" sizeMd="6" className="ion-align-items-center ion-justify-content-start">
                <IonItem lines="none" style={{ marginTop: 20 }}>
                  <IonCheckbox
                    checked={isPrivate}
                    onIonChange={e => setIsPrivate(e.detail.checked!)}
                    slot="start"
                  />
                  <IonLabel>Private Event</IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Items to Bring */}
          <IonText color="dark">
            <h2 style={{ fontSize: 18, fontWeight: 500, marginTop: 32, marginBottom: 8 }}>Items to Bring</h2>
          </IonText>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <IonButton size="small" fill="outline" color="primary" onClick={addItemInput}>
              <IonIcon icon={addOutline} slot="start" />
              Add Item
            </IonButton>
          </div>
          <IonList>
            {itemInputs.length === 0 && (
              <IonItem>
                <IonLabel color="medium">
                  No items added yet. Click "Add Item" to start.
                </IonLabel>
              </IonItem>
            )}
            {itemInputs.map(item => (
              <IonItem key={item.id}>
                <IonIcon icon={giftOutline} slot="start" />
                <IonInput
                  value={item.name}
                  placeholder="e.g., Snacks"
                  onIonChange={e =>
                    updateItemInput(item.id, 'name', e.detail.value!)
                  }
                  style={{ maxWidth: 160 }}
                />
                <IonInput
                  type="number"
                  min="1"
                  value={item.quantity}
                  placeholder="Qty"
                  onIonChange={e =>
                    updateItemInput(item.id, 'quantity', parseInt(e.detail.value!) || 1)
                  }
                  style={{ maxWidth: 80 }}
                />
                <IonButton fill="clear" color="danger" size="small" onClick={() => removeItemInput(item.id)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
            <IonButton
              type="submit"
              disabled={isSubmitting}
              color="primary"
              style={{ minWidth: 120 }}
            >
              {isSubmitting ? (
                <>
                  <IonSpinner name="crescent" style={{ marginRight: 8 }} />
                  Creating...
                </>
              ) : (
                'Create Event'
              )}
            </IonButton>
          </div>
        </form>
      </IonCardContent>
    </IonCard>
  );
};

export default CreateEventPage;
