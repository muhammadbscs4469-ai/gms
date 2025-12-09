import { 
  FiTruck, 
  FiMapPin, 
  FiFileText, 
  FiAlertCircle, 
  FiDollarSign, 
  FiPackage, 
  FiBox, 
  FiTrendingUp, 
  FiShoppingCart, 
  FiClipboard, 
  FiNavigation, 
  FiNavigation2 
} from "react-icons/fi";

const cardData = [
  {
    title: "Shipment Tracker",
    icon: FiMapPin,
    description: "Real-time tracking of shipment locations and updates.",
    link: "/dashboard/logistic/shipment-tracker",
  },
  {
    title: "Shipment Status",
    icon: FiTruck,
    description: "Track and monitor the current status of all shipments.",
    link: "/dashboard/logistic/shipment-status",
  },
  {
    title: "Audit GMS Order Processing",
    icon: FiFileText,
    description: "Review and audit GMS order processing activities.",
    link: "/dashboard/logistic/audit-gms",
  },
  {
    title: "Back Order",
    icon: FiAlertCircle,
    description: "Manage and track back-ordered items and shipments.",
    link: "/dashboard/logistic/back-order",
  },
  {
    title: "GMS Landing Cost HS Code",
    icon: FiDollarSign,
    description: "View landing costs categorized by HS codes.",
    link: "/dashboard/logistic/landing-cost-hs",
  },
  {
    title: "GMS PCT",
    icon: FiPackage,
    description: "Manage GMS PCT (Package Category Type) settings.",
    link: "/dashboard/logistic/gms-pct",
  },
  {
    title: "GMS Shipments",
    icon: FiBox,
    description: "Overview of all GMS shipment activities and status.",
    link: "/dashboard/logistic/gms-shipments",
  },
  {
    title: "Landing Cost Wise",
    icon: FiTrendingUp,
    description: "Analyze landing costs across different categories.",
    link: "/dashboard/logistic/landing-cost-wise",
  },
  {
    title: "Logistic Shipment",
    icon: FiShoppingCart,
    description: "Comprehensive logistic shipment management system.",
    link: "/dashboard/logistic/logistic-shipment",
  },
  {
    title: "Open Order Items",
    icon: FiClipboard,
    description: "View and manage all open order items pending shipment.",
    link: "/dashboard/logistic/open-order-items",
  },
  {
    title: "RPT Shipment HUB-DST",
    icon: FiNavigation,
    description: "Report on shipments from hub to destination.",
    link: "/dashboard/logistic/rpt-hub-dst",
  },
  {
    title: "RPT Shipment ORG-DST",
    icon: FiNavigation2,
    description: "Report on shipments from origin to destination.",
    link: "/dashboard/logistic/rpt-org-dst",
  },
];

export default cardData;