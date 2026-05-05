function getAverage(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

function getMaxActiveSequence(telemetryString) {
  if (!telemetryString) return 0;
  const sequences = telemetryString.split("0");
  let maxLength = 0;
  for (const seq of sequences) {
    if (seq.length > maxLength) maxLength = seq.length;
  }
  return maxLength;
}

function merge(...objects) {
  const mergedResult = {};
  for (const obj of objects) {
    for (const key in obj) {
      if (!(key in mergedResult)) {
        mergedResult[key] = obj[key];
      }
    }
  }
  return mergedResult;
}

function countIdentic(arr) {
  const uniqueItems = new Set();
  let duplicateCount = 0;
  for (const item of arr) {
    if (uniqueItems.has(item)) duplicateCount++;
    else uniqueItems.add(item);
  }
  return duplicateCount;
}

function processSensorAlerts(alertsQueue) {
  let currentAlert;
  let processedCount = 0;
  do {
    currentAlert = alertsQueue.shift();
    if (!currentAlert) break;
    if (currentAlert !== "КРИТИЧЕСКАЯ_ОСТАНОВКА") {
      processedCount++;
    }
  } while (currentAlert !== "КРИТИЧЕСКАЯ_ОСТАНОВКА");
  console.log(`[Система] Обработано логов до остановки: ${processedCount}`);
}

export function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

export {
  getAverage,
  getMaxActiveSequence,
  merge,
  countIdentic,
  processSensorAlerts,
};
