const postSchema = mongoose.Schema(
    {
      title: { type: String, required: true, trim: true },
      type: { type: String, required: true },
      source: { type: String, required: true, trim: true },
      data: { type: String, required: true, trim: true },
      information: {
        rating: {
          type: Number,
          required: true,
          default: 0,
        },
        dateHint: {
          type: Date,
        },
        tags: [{ type: String }],
      },
      approved: { type: Boolean, default: false },
      posted: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  );