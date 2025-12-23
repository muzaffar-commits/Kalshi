export const prepareSeries = (data: any[]): any[] => {
  if (!data?.length) return [];

  // Find max length
  const maxLength = Math.max(...data.map((item) => item.data?.length || 0));
  if (maxLength === 0) return [];

  return data.map((item: any) => {
    const originalData = item.data || [];
    const lastPrice =
      originalData.length > 0 ? originalData[originalData.length - 1].price : 0;

    let extendedData = [...originalData];

    // Duplicate last point to make length equal to maxLength
    if (originalData.length < maxLength) {
      const missingCount = maxLength - originalData.length;
      for (let i = 0; i < missingCount; i++) {
        extendedData.push({
          price: lastPrice,
          timestamp: originalData[originalData.length - 1]?.timestamp || 0,
        });
      }
    }

    return {
      name: item.optionName,
      data: extendedData.map((d: any) => ({
        x: d.timestamp,
        y: Number(d.price.toFixed(2)),
      })),
    };
  });
};
