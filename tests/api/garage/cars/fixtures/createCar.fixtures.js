export const negativeFixtures = [
  {
    title: "should return error message when mileage is missing",
    inputData: {
      carBrandId: 1,
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Mileage is required" },
    },
  },
  {
    title: "should return error message when brandId is missing",
    inputData: {
      mileage: Math.floor(Math.random() * 100),
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Car brand id is required" },
    },
  },
  {
    title: "should return error message when modelId is missing",
    inputData: {
      mileage: Math.floor(Math.random() * 100),
      carBrandId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Car model id is required" },
    },
  },
  {
    title: "should return error message when car brand is invalid",
    inputData: {
      mileage: Math.floor(Math.random() * 100),
      carBrandId: 100,
      carModelId: 1,
    },
    expectedData: {
      statusCode: 404,
      data: { status: "error", message: "Brand not found" },
    },
  },
  {
    title: "should return error message when car model id is invalid",
    inputData: {
      mileage: Math.floor(Math.random() * 100),
      carBrandId: 1,
      carModelId: 100,
    },
    expectedData: {
      statusCode: 404,
      data: { status: "error", message: "Model not found" },
    },
  },
  {
    title: "should return error message when mileage value is invalid",
    inputData: {
      mileage: 1000000,
      carBrandId: 1,
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Mileage has to be from 0 to 999999" },
    },
  },
];
