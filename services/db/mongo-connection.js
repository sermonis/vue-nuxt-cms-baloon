const mongoose = require("mongoose");
async function main() {
  const uri = process.env.MONGO_CONNECTION_STRING;
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  console.log("mongodb connected");
}

main();
