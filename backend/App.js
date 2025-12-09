import express from "express";
import cors from "cors";
import shipmentRoutes from "./Routes/shipmentRoutes.js";
import menucardRoutes from "./Routes/menucardRoutes.js";
import otherRoutes from "./Routes/otherRoutes.js"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/shipments", shipmentRoutes);
app.use("/menucard", menucardRoutes);
app.use("/other",otherRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
