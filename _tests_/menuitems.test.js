const request = require("supertest");
const app = require("../app");

jest.mock("../models/menuItem", () => ({
  find: jest.fn(),
}));

const MenuItem = require("../models/menuItem");

const buildMockQuery = (data = []) => {
  const query = {
    _select: null,
    _sort: null,
    _skip: null,
    _limit: null,
    _populate: null,
    populate: jest.fn(function (...args) {
      query._populate = args;
      return query;
    }),
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

describe("GET /api/menuitems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns limited data using query operators + select", async () => {
    const mockData = [{ name: "Taco", price: 10 }];
    const mockQuery = buildMockQuery(mockData);

    MenuItem.find.mockReturnValue(mockQuery);

    const res = await request(app).get(
      "/api/menuitems?price[lte]=15&select=name,price&page=1&limit=5"
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);

    expect(MenuItem.find).toHaveBeenCalledWith({
      "price[$lte]": "15",
    });

    expect(mockQuery.populate).toHaveBeenCalledWith("restaurantId", "-__v");
    expect(mockQuery.select).toHaveBeenCalledWith("name price");
  });

  test("returns pagination using skip and limit", async () => {
    const mockQuery = buildMockQuery([{ name: "A" }]);
    MenuItem.find.mockReturnValue(mockQuery);

    const res = await request(app).get("/api/menuitems?page=3&limit=4");

    expect(res.status).toBe(200);
    expect(res.body.page).toBe(3);
    expect(res.body.limit).toBe(4);

    expect(mockQuery.skip).toHaveBeenCalledWith(8);
    expect(mockQuery.limit).toHaveBeenCalledWith(4);
  });

  test("sorts ascending", async () => {
    const mockQuery = buildMockQuery([{ name: "A" }]);
    MenuItem.find.mockReturnValue(mockQuery);

    const res = await request(app).get("/api/menuitems?sort=name");

    expect(res.status).toBe(200);
    expect(mockQuery.sort).toHaveBeenCalledWith("name");
  });

  test("sorts descending", async () => {
    const mockQuery = buildMockQuery([{ name: "A" }]);
    MenuItem.find.mockReturnValue(mockQuery);

    const res = await request(app).get("/api/menuitems?sort=-name");

    expect(res.status).toBe(200);
    expect(mockQuery.sort).toHaveBeenCalledWith("-name");
  });
});
