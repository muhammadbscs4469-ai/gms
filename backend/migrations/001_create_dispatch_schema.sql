-- ==========================================
-- DISPATCH MANAGER DATABASE SCHEMA
-- Migration: 001_create_dispatch_schema.sql
-- Created: 2025-12-11
-- ==========================================

-- 1. CUSTOMERS TABLE (Parent)
CREATE TABLE IF NOT EXISTS Customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customerCode VARCHAR(50) UNIQUE NOT NULL,
  customerName VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX (customerCode),
  INDEX (status)
);

-- 2. ZONES TABLE (Reference)
CREATE TABLE IF NOT EXISTS Zones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  zoneName VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  region VARCHAR(100),
  status VARCHAR(20) DEFAULT 'Active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX (zoneName),
  INDEX (city)
);

-- 3. DELIVERY CHALLANS TABLE (Source Documents - Parent)
CREATE TABLE IF NOT EXISTS DeliveryChallans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  docNum VARCHAR(50) UNIQUE NOT NULL,
  docDate DATETIME NOT NULL,
  dueDate DATETIME,
  docType ENUM('LDS_LIVE', 'Clinical') NOT NULL,
  cardCode VARCHAR(50) NOT NULL,
  cardName VARCHAR(255) NOT NULL,
  itemCode VARCHAR(50),
  itemDescription TEXT,
  quantity INT DEFAULT 0,
  address TEXT,
  status ENUM('Open for Dispatch', 'Dispatched', 'Pending', 'Cancelled') DEFAULT 'Open for Dispatch',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (cardCode) REFERENCES Customers(customerCode),
  INDEX (status),
  INDEX (docDate),
  INDEX (cardCode)
);

-- 4. DISPATCHES TABLE (Main Order - Parent)
CREATE TABLE IF NOT EXISTS Dispatches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dispatchCode VARCHAR(50) UNIQUE NOT NULL,
  deliveryChallonId INT NOT NULL,
  
  -- Source Document Info
  sourcDocDate DATETIME NOT NULL,
  docType VARCHAR(50),
  docNum VARCHAR(50),
  cardCode VARCHAR(50) NOT NULL,
  cardName VARCHAR(255),
  
  -- Dispatch Info
  dispatchType VARCHAR(50),
  dispatchDatetime DATETIME NOT NULL,
  zone VARCHAR(100),
  city VARCHAR(100),
  
  -- Handling & Package
  handlingInfo TEXT,
  dispatchMode VARCHAR(50),
  
  -- Tracking
  tracking VARCHAR(255),
  
  -- Status & Audit
  status ENUM('Draft', 'Submitted', 'In Transit', 'Delivered', 'Cancelled') DEFAULT 'Draft',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy VARCHAR(100),
  
  FOREIGN KEY (deliveryChallonId) REFERENCES DeliveryChallans(id),
  FOREIGN KEY (cardCode) REFERENCES Customers(customerCode),
  INDEX (status),
  INDEX (dispatchDatetime),
  INDEX (zone),
  INDEX (cardCode)
);

-- 5. DISPATCH DETAILS TABLE (Items in Dispatch - Child)
CREATE TABLE IF NOT EXISTS DispatchDetails (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dispatchId INT NOT NULL,
  
  -- Item Info
  itemCode VARCHAR(50),
  itemDescription TEXT,
  
  -- Quantities
  pcsQty INT DEFAULT 0,
  boxQty INT DEFAULT 0,
  weight DECIMAL(10, 2) DEFAULT 0,
  totalKg DECIMAL(10, 2) DEFAULT 0,
  
  -- Pricing
  unitPrice DECIMAL(15, 2),
  totalPrice DECIMAL(15, 2),
  currency VARCHAR(10) DEFAULT 'PKR',
  
  -- Status
  status VARCHAR(50) DEFAULT 'Pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (dispatchId) REFERENCES Dispatches(id) ON DELETE CASCADE,
  INDEX (dispatchId),
  INDEX (itemCode)
);

-- 6. SHIPMENTS TABLE (Tracking - Child)
CREATE TABLE IF NOT EXISTS Shipments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dispatchId INT NOT NULL,
  
  -- Direction & Reference
  direction ENUM('IN', 'OUT') DEFAULT 'OUT',
  docNum VARCHAR(50),
  docDate DATETIME NOT NULL,
  cardName VARCHAR(255),
  
  -- Reference Info
  refNumber VARCHAR(100),
  tracking VARCHAR(255),
  trackingType VARCHAR(50) DEFAULT 'BOX',
  info VARCHAR(100),
  
  -- Company
  company VARCHAR(50),
  
  -- Delivery Info
  status ENUM('Pending', 'In Transit', 'Delivered', 'Failed') DEFAULT 'Pending',
  deliveredBy VARCHAR(100),
  receivedBy VARCHAR(100),
  deliveryProof TEXT,
  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (dispatchId) REFERENCES Dispatches(id) ON DELETE CASCADE,
  INDEX (status),
  INDEX (docDate),
  INDEX (dispatchId)
);

-- ==========================================
-- RELATIONSHIP SUMMARY:
-- ==========================================
-- Customers (1) ──→ (Many) DeliveryChallans
-- DeliveryChallans (1) ──→ (Many) Dispatches
-- Dispatches (1) ──→ (Many) DispatchDetails
-- Dispatches (1) ──→ (Many) Shipments
-- Zones (Reference)
-- ==========================================
