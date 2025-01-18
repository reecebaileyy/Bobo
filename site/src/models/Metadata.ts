// src/models/Metadata.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface MetadataDocument extends Document {
  token: number;
  // Use `unknown` if there's no strict type, or define a more specific interface
  metadata: Record<string, unknown>;
}

const metadataSchema = new Schema<MetadataDocument>({
  token: { type: Number, required: true },
  metadata: { type: Object, required: true },
});

export default mongoose.model<MetadataDocument>('Metadata', metadataSchema);
