from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from scipy.stats import norm

app = Flask(__name__)

def moving_average(series, window=7):
    """Compute moving average with a specified window."""
    return series.rolling(window=window).mean()

@app.route('/api/forecast', methods=['POST'])
def forecast():
    """
    Expects JSON:
    {
        "demand": [10, 12, 9, 11, ...],
        "window": 7,
        "Lead_Time": 7,
        "Service_Level_Factor": 0.95
    }
    Returns JSON:
    {
        "Daily_Forecast": 11.0,
        "Safety_Stock": 3.2,
        "Reorder_Point": 80.4
    }
    """
    try:
        j = request.get_json()
        demand_list = j.get('demand', [])
        if not demand_list or len(demand_list) < 2:
            return jsonify({"error": "Provide at least 2 demand values"}), 400

        demand = pd.Series(demand_list, dtype=float)
        window = int(j.get('window', 7))
        lead_time = int(j.get('Lead_Time', 7))
        service_level = float(j.get('Service_Level_Factor', 0.95))

        if len(demand) < window:
            return jsonify({"error": f"Demand list must be at least {window} values"}), 400

        # Forecast: simple moving average
        ma = moving_average(demand, window).iloc[-1]

        # Standard deviation of window
        std = demand.rolling(window=window).std().iloc[-1]

        # z-score for service level
        z = float(norm.ppf(service_level))

        # Safety stock
        safety_stock = z * std * np.sqrt(lead_time)

        # Reorder point
        reorder_point = float(ma * lead_time + safety_stock)

        return jsonify({
            "Daily_Forecast": float(ma),
            "Safety_Stock": float(safety_stock),
            "Reorder_Point": reorder_point
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def hello():
    return "InventoryPal API is running."


if __name__ == '__main__':
    app.run(debug=True)
