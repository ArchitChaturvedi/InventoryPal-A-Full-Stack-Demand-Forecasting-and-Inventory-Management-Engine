# InventoryPal-A-Full-Stack-Demand-Forecasting-and-Inventory-Management-Engine

---

## Project Overview

InventoryPal is a web-based application that allows supply chain managers and inventory specialists to visualize historical demand data, calculate safety stock, forecast daily demand, and determine reorder points. Designed as a full-stack demo project, it integrates modern frontend technologies with a Python-based backend to simulate a real-world supply chain planning scenario.

---

## Features

- Upload historical demand data via CSV.
- Compute **forecast per day** using a moving average of recent demand.
- Calculate **safety stock** based on variability and service level.
- Compute **reorder point** for inventory management.
- Interactive **line chart visualization** of demand, forecast, and reorder points.
- Adjustable parameters for **lead time** and **moving average window**.
- Fully responsive and styled using **TailwindCSS**.

---

## Tools/Technologies Used

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Recharts
- **Backend:** Flask, Pandas, NumPy, SciPy, Flask-SQLAlchemy (optional)
- **Data Handling:** CSV uploads for historical demand
- **Deployment-ready:** Backend can run on Heroku/Render; Frontend on Vercel/Netlify
- **Local Server**: Already ran on local server through Microsoft VSCode (http://127.0.0.1:5000 for backend and http://localhost:5173/ for frontend)
