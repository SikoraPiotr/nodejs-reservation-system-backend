import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true, unique: true })
  reservationId: string;

  @Prop({ required: true })
  guestName: string;

  @Prop({ enum: ['WAITING', 'DONE', 'CANCLED'], required: true })
  status: string;

  @Prop({ required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkOutDate: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
