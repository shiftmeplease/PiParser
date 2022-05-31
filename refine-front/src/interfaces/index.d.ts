export interface ICategory {
  id: string;
  title: string;
}
export interface IPost {
  sortId?: number;
  _id: number;
  title: string;
  type: string;
  source: "string";
  data: "string";
  // status: "published" | "draft" | "rejected";
  approved: "boolean";
  posted: "boolean";
  createdAt: "string";
  information: {
    community: "string";
    rating: "number";
    dateHint: "date";
    tags: ["string"];
  };
}

// const postSchema = mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     type: { type: String, required: true },
//     source: { type: String, required: true, trim: true },
//     data: { type: String, required: true, trim: true },
//     information: {
//       community: {
//         type: String,
//       },
//       rating: {
//         type: Number,
//         required: true,
//         default: 0,
//       },
//       dateHint: {
//         type: Date,
//       },
//       tags: [{ type: String }],
//     },
//     approved: { type: Boolean, default: false },
//     posted: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   },
// );
