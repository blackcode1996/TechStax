import mongoose, { Schema, Document } from 'mongoose';

interface NodeData {
  label: string;
}

interface Position {
  x: number;
  y: number;
}

interface Node {
  id: string;
  type: string;
  data: NodeData;
  position: Position;
  width?: number;
  height?: number;
  selected?: boolean;
  positionAbsolute?: Position;
  dragging?: boolean;
  origin?: [number, number];
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface Workspace extends Document {
  id: number;
  logo: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

const NodeDataSchema = new Schema<NodeData>({
  label: { type: String, required: true }
});


const PositionSchema = new Schema<Position>({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

const NodeSchema = new Schema<Node>({
  id: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: NodeDataSchema, required: true },
  position: { type: PositionSchema, required: true },
  width: Number,
  height: Number,
  selected: Boolean,
  positionAbsolute: PositionSchema,
  dragging: Boolean,
  origin: [Number]
});

const EdgeSchema = new Schema<Edge>({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true }
});


const WorkspaceSchema: Schema<Workspace> = new Schema({
  id: { type: Number, required: true },
  logo: { type: String, required: true },
  name: { type: String, required: true },
  nodes: [NodeSchema],
  edges: [EdgeSchema]
});

const WorkspaceModel = mongoose.model<Workspace & Document>('Workspace', WorkspaceSchema);

export { Workspace, WorkspaceModel };
