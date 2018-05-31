module.exports = ({mongoose}) => {
  const PagesSchema = new mongoose.Schema({
    pid: {
      type: String,
      unique: true
    },
    title: {
      type: String
    },
    comps: {
      type: Array
    },
    lastedit: {
      type: String
    }
  });

  return mongoose.model('Pages', PagesSchema);
};
