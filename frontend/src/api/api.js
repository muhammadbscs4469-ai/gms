import axios from "axios";

// {}
const API=axios.create({
    baseURL:"http://localhost:5000",
});


 export const createShipment=(data)=>API.post("/shipments", data);
 export const getShipments=()=>API.get("/shipments");

 export const createMenuCard=(data)=>API.post("/menucard",data);
 export const addMenuCardItem=(data)=>API.post("/menucard/item",data);


 //export const addMenuCardItem=(data)=>API.post("/menucard",data);
 export const addRouteDetail=(data)=>API.post("/other/route",data);
 export const addPerformaInvoice=(data)=>API.post("/other/performa",data);
export const getMenuCard = (shipmentId) => API.get(`/menucard/${shipmentId}`);
export const searchShipments = (query) => API.get(`/search?query=${encodeURIComponent(query || '')}`);