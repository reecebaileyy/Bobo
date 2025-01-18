import mongoose, { Schema, Document } from 'mongoose';

export interface MetadataDocument extends Document {
  token: number;
  metadata: Record<string, any>;
}

const metadataSchema = new Schema<MetadataDocument>({
  token: { type: Number, required: true },
  metadata: { type: Object, required: true },
});

export default mongoose.model<MetadataDocument>('Metadata', metadataSchema);
