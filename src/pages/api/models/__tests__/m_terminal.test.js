const { getTerminal, createTerminal, updateTerminal, deleteTerminal } = require("../m_terminal");

// Mock the database pool
jest.mock("../../../../lib/db", () => {
  const mockPool = {
    query: jest.fn(),
  };
  return mockPool;
});

const pool = require("../../../../lib/db");

describe("Model Terminal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // GET TERMINAL
  // ==========================================
  describe("getTerminal", () => {
    it("should return all terminal when no search param", async () => {
      const mockRows = [
        {
          id: 1,
          merchant_id: 1,
          mitra_id: 2,
          terminal_name: "EDC BCA 001",
          tid: "TID001",
          nomor_seri: "SN123456",
          jenis_terminal: "edc",
          lokasi: "Jakarta Pusat",
          status: "active",
        },
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await getTerminal();

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRows);
    });

    it("should filter terminal by search keyword", async () => {
      const mockRows = [
        {
          id: 1,
          terminal_name: "EDC BCA 001",
          tid: "TID001",
          nomor_seri: "SN123456",
          jenis_terminal: "edc",
          status: "active",
        },
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await getTerminal("EDC");

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[1]).toContain("%EDC%");
      expect(result).toEqual(mockRows);
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Connection refused"));

      await expect(getTerminal()).rejects.toThrow("Database error");
    });
  });

  // ==========================================
  // CREATE TERMINAL
  // ==========================================
  describe("createTerminal", () => {
    const validTerminal = {
      merchant_id: 1,
      mitra_id: 2,
      terminal_name: "EDC BCA 001",
      tid: "TID001",
      nomor_seri: "SN123456",
      jenis_terminal: "edc",
      lokasi: "Jakarta Pusat",
      status: "active",
      created_by: "admin",
    };

    it("should create terminal and return the inserted row", async () => {
      const mockResult = { id: 1, ...validTerminal };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await createTerminal(validTerminal);

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("INSERT INTO t_terminal");
      expect(queryCall[1]).toContain("EDC BCA 001");
      expect(queryCall[1]).toContain("TID001");
      expect(queryCall[1]).toContain("SN123456");
      expect(queryCall[1]).toContain("edc");
      expect(result).toEqual(mockResult);
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Duplicate key"));

      await expect(createTerminal(validTerminal)).rejects.toThrow("Database error");
    });
  });

  // ==========================================
  // UPDATE TERMINAL
  // ==========================================
  describe("updateTerminal", () => {
    const updateData = {
      id: 1,
      merchant_id: 1,
      mitra_id: 2,
      terminal_name: "EDC BCA Updated",
      tid: "TID001",
      nomor_seri: "SN123456",
      jenis_terminal: "edc",
      lokasi: "Jakarta Selatan",
      status: "active",
      updated_by: "admin",
    };

    it("should update terminal and return updated row", async () => {
      pool.query.mockResolvedValue({ rows: [updateData] });

      const result = await updateTerminal(updateData);

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("UPDATE t_terminal");
      expect(result).toEqual(updateData);
    });

    it("should throw error if terminal not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(updateTerminal(updateData)).rejects.toThrow("Terminal not found");
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Connection lost"));

      await expect(updateTerminal(updateData)).rejects.toThrow("Database error");
    });
  });

  // ==========================================
  // DELETE (SOFT DELETE) TERMINAL
  // ==========================================
  describe("deleteTerminal", () => {
    it("should toggle terminal status to inactive", async () => {
      const mockResult = { id: 1, terminal_name: "EDC BCA 001", status: "inactive" };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await deleteTerminal(1, "inactive");

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("UPDATE t_terminal");
      expect(queryCall[0]).toContain("status");
      expect(result).toEqual(mockResult);
    });

    it("should toggle terminal status to active", async () => {
      const mockResult = { id: 1, terminal_name: "EDC BCA 001", status: "active" };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await deleteTerminal(1, "active");

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result.status).toBe("active");
    });

    it("should throw error if terminal not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(deleteTerminal(999, "inactive")).rejects.toThrow("Terminal not found");
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Timeout"));

      await expect(deleteTerminal(1, "inactive")).rejects.toThrow("Database error");
    });
  });
});
