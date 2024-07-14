/*import mongoose from "mongoose";
export const connectDB = async () => {
  return await mongoose
    .connect(process.env.CONNECTION_DB_URL)
    .then((result) => {
      console.log("DataBase Connected ----->");
    })
    .catch((error) => {
      console.log(error);
    });
};
*/
import mongoose from 'mongoose'

export const connectDB = async () => {
  return await mongoose
    .connect(`mongodb://127.0.0.1:27017/task`)
    .then((res) => console.log('DB connection success'))
    .catch((err) => console.log('DB connection Fail', err))
}
