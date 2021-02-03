import mongoose, { ConnectOptions } from "mongoose";
import config from "./index";

(async () => {
  try {
    const mongooseOptions: ConnectOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
      mongooseOptions
    );

    console.log("MONGODB connect to: ", db.connection.name);
  } catch (e) {
    console.log(e);
  }
})();
