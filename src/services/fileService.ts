import fs from "fs";

const readData = (path: string) => {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log("fs.readFileSync:", err);
    return [];
  }
};

const writeData = (path: string, data: unknown) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.log("fs.writeFileSync:", err);
  }
};

export { readData, writeData };
