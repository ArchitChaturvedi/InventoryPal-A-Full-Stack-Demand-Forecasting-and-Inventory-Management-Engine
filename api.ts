export interface ForecastRequest {
  demand: number[];
  window?: number;
  lead_time_days?: number;
  service_level?: number;
}

export interface ForecastResponse {
  forecast_per_day: number;
  safety_stock: number;
  reorder_point: number;
  error?: string;
}

/**
 * Call the Flask API to get forecast, safety stock, and reorder point.
 * @param data - ForecastRequest object
 * @returns ForecastResponse
 */
export async function getForecast(data: ForecastRequest): Promise<ForecastResponse> {
  try {
    const res = await fetch("/api/forecast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        demand: data.demand,
        window: data.window ?? 7,
        lead_time_days: data.lead_time_days ?? 7,
        service_level: data.service_level ?? 0.95,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { forecast_per_day: 0, safety_stock: 0, reorder_point: 0, error: text };
    }

    const result = await res.json();
    return {
      forecast_per_day: result.forecast_per_day,
      safety_stock: result.safety_stock,
      reorder_point: result.reorder_point,
    };
  } catch (err) {
    return {
      forecast_per_day: 0,
      safety_stock: 0,
      reorder_point: 0,
      error: (err as Error).message,
    };
  }
}
