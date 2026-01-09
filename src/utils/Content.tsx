import { AxiosError } from "axios";
import { ChartSeries, RawSeries } from "./typesInterface";

export const prepareSeries = (data: RawSeries[] | undefined): ChartSeries[] => {
  if (!data || data.length === 0) return [];

  const maxLength = Math.max(...data.map((item) => item.data.length));

  if (maxLength === 0) return [];

  return data.map((item) => {
    const originalData = item.data;

    const lastPoint = originalData[originalData.length - 1];
    const lastPrice = lastPoint?.price ?? 0;
    const lastTimestamp = lastPoint?.timestamp ?? 0;

    const extendedData = [...originalData];

    if (originalData.length < maxLength) {
      const missing = maxLength - originalData.length;

      for (let i = 0; i < missing; i++) {
        extendedData.push({
          price: lastPrice,
          timestamp: lastTimestamp,
        });
      }
    }

    return {
      name: item.optionName,
      data: extendedData.map((d) => ({
        x: d.timestamp,
        y: Number(d.price.toFixed(2)),
      })),
    };
  });
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.errors?.length > 0) {
      return (
        (error.response?.data?.errors?.[0] as { message?: string })?.message ??
        "Request failed"
      );
    } else {
      return (
        (error.response?.data as { message?: string })?.message ??
        "Request failed"
      );
    }
  }
  return "Unexpected error";
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
