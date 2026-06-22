const { getMitra, createMitra, updateMitra, deleteMitra } = require("../m_mitra");

// Mock the database pool
jest.mock("../../../../lib/db", () => {
  const mockPool = {
    query: jest.fn(),
  };
  return mockPool;
});

const pool = require("../../../../lib/db");

describe("Model Mitra", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // GET MITRA
  // ==========================================
  describe("getMitra", () => {
    it("should return all mitra when no search param", async () => {
      const mockRows = [
        {
          id: 1,
          nama_mitra: "Bank BCA",
          jenis_mitra: "bank",
          alamat: "Jl. Sudirman",
          kontak_person: "Budi",
          nomor_telepon: "021-99999999",
          email: "bca@test.com",
          website: "bca.co.id",
          status: "active",
        },
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await getMitra();

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRows);
    });

    it("should filter mitra by search keyword", async () => {
      const mockRows = [
        {
          id: 1,
          nama_mitra: "Bank BCA",
          jenis_mitra: "bank",
          status: "active",
        },
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await getMitra("BCA");

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[1]).toContain("%BCA%");
      expect(result).toEqual(mockRows);
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Connection refused"));

      await expect(getMitra()).rejects.toThrow("Database error");
    });
  });

  // ==========================================
  // CREATE MITRA
  // ==========================================
  describe("createMitra", () => {
    const validMitra = {
      nama_mitra: "GoPay",
      jenis_mitra: "payment_gateway",
      alamat: "Jl. Kemang",
      kontak_person: "Andi",
      nomor_telepon: "081234567890",
      email: "gopay@test.com",
      website: "gopay.co.id",
      status: "active",
      created_by: "admin",
    };

    it("should create mitra and return the inserted row", async () => {
      const mockResult = { id: 1, ...validMitra };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await createMitra(validMitra);

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("INSERT INTO t_mitra");
      expect(queryCall[1]).toContain("GoPay");
      expect(queryCall[1]).toContain("payment_gateway");
      expect(queryCall[1]).toContain("gopay@test.com");
      expect(result).toEqual(mockResult);
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Duplicate key"));

      await expect(createMitra(validMitra)).rejects.toThrow("Database error");
    });
  });

  // ==========================================
  // UPDATE MITRA
  // ==========================================
  describe("updateMitra", () => {
    const updateData = {
      id: 1,
      nama_mitra: "GoPay Updated",
      jenis_mitra: "payment_gateway",
      alamat: "Jl. Kemang Baru",
      kontak_person: "Andi Updated",
      nomor_telepon: "081234567891",
      email: "gopay.new@test.com",
      website: "gopay.co.id",
      status: "active",
      updated_by: "admin",
    };

    it("should update mitra and return updated row", async () => {
      pool.query.mockResolvedValue({ rows: [updateData] });

      const result = await updateMitra(updateData);

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("UPDATE t_mitra");
      expect(result).toEqual(updateData);
    });

    it("should throw error if mitra not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(updateMitra(updateData)).rejects.toThrow("Mitra not found");
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Connection lost"));

      await expect(updateMitra(updateData)).rejects.toThrow("Database error");
    });
  });

  // ==========================================
  // DELETE (SOFT DELETE) MITRA
  // ==========================================
  describe("deleteMitra", () => {
    it("should toggle mitra status to inactive", async () => {
      const mockResult = { id: 1, nama_mitra: "GoPay", status: "inactive" };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await deleteMitra(1, "inactive");

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("UPDATE t_mitra");
      expect(queryCall[0]).toContain("status");
      expect(result).toEqual(mockResult);
    });

    it("should toggle mitra status to active", async () => {
      const mockResult = { id: 1, nama_mitra: "GoPay", status: "active" };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await deleteMitra(1, "active");

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result.status).toBe("active");
    });

    it("should throw error if mitra not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(deleteMitra(999, "inactive")).rejects.toThrow("Mitra not found");
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Timeout"));

      await expect(deleteMitra(1, "inactive")).rejects.toThrow("Database error");
    });
  });
});
