const request = require("supertest");
const app = require("../app");

jest.mock("../models/restaurant", () => ({
  find: jest.fn(),
}));

const Restaurant = require("../models/restaurant");

const buildMockQuery = (data = []) => {
  const query = {
    _select: null,
    _sort: null,
    _skip: null,
    _limit: null,
    select: jest.fn(function (val) {
      query._select = val;
      return query;
    }),
    sort: jest.fn(function (val) {
      query._sort = val;
      return query;
    }),
    skip: jest.fn(function (val) {
      query._skip = val;
      return query;
    }),
    limit: jest.fn(function (val) {
      query._limit = val;
      return query;
    }),
    then: (resolve, reject) => Promise.resolve(data).then(resolve, reject),
  };

  return query;
};

describe("GET /api/restaurants", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns limited data using query operators + select", async () => {
    const mockData = [{ name: "Jess Pizza", cuisine: "Italian" }];
    const mockQuery = buildMockQuery(mockData);

    Restaurant.find.mockReturnValue(mockQuery);

    const res = await request(app).get(
      "/api/restaurants?rating[gte]=4&select=name,cuisine&page=1&limit=5"
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);

    expect(Restaurant.find).toHaveBeenCalledWith({
      "rating[$gte]": "4",
    });

    expect(mockQuery.select).toHaveBeenCalledWith("name cuisine");
  });

  test("returns pagination using skip and limit", async () => {
    const mockData = [{ name: "A" }, { name: "B" }];
    const mockQuery = buildMockQuery(mockData);

    Restaurant.find.mockReturnValue(mockQuery);

    const res = await request(app).get("/api/restaurants?page=2&limit=5");

    expect(res.status).toBe(200);
    expect(res.body.page).toBe(2);
    expect(res.body.limit).toBe(5);

    expect(mockQuery.skip).toHaveBeenCalledWith(5);
    expect(mockQuery.limit).toHaveBeenCalledWith(5);
  });

  test("sorts ascending", async () => {
    const mockQuery = buildMockQuery([{ name: "A" }]);
    Restaurant.find.mockReturnValue(mockQuery);

    const res = await request(app).get("/api/restaurants?sort=rating");

    expect(res.status).toBe(200);
    expect(mockQuery.sort).toHaveBeenCalledWith("rating");
  });

  test("sorts descending", async () => {
    const mockQuery = buildMockQuery([{ name: "A" }]);
    Restaurant.find.mockReturnValue(mockQuery);

    const res = await request(app).get("/api/restaurants?sort=-rating");

    expect(res.status).toBe(200);
    expect(mockQuery.sort).toHaveBeenCalledWith("-rating");
  });
});
