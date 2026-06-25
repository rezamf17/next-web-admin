const { getTransaction, createTransaction } = require("../m_transaction");

// Mock the database pool
jest.mock("../../../../lib/db", () => {
  const mockPool = {
    query: jest.fn(),
  };
  return { __esModule: true, default: mockPool };
});

const pool = require("../../../../lib/db").default;

describe("Model Transaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // GET TRANSACTION
  // ==========================================
  describe("getTransaction", () => {
    it("should return all transactions when no search param", async () => {
      const mockRows = [
        {
          id: 1,
          merchant_id: 1,
          mitra_id: 2,
          terminal_id: 3,
          trx_ref_number: "TRX20260624001",
          trx_type: "payment",
          amount: 50000,
          fee: 500,
          total_amount: 50500,
          payment_method: "qris",
          card_number: null,
          response_code: "00",
          response_message: "Success",
          trx_date: "2026-06-24T10:00:00.000Z",
          settlement_date: null,
          status: "A",
          merchant_name: "Toko ABC",
          nama_mitra: "Bank BCA",
          terminal_name: "EDC BCA 001",
        },
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await getTransaction();

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("t_transaction");
      expect(queryCall[0]).toContain("LEFT JOIN t_merchant");
      expect(queryCall[0]).toContain("LEFT JOIN t_mitra");
      expect(queryCall[0]).toContain("LEFT JOIN t_terminal");
      expect(result).toEqual(mockRows);
    });

    it("should filter transactions by search keyword", async () => {
      const mockRows = [
        {
          id: 1,
          trx_ref_number: "TRX20260624001",
          trx_type: "payment",
          amount: 50000,
          status: "A",
        },
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await getTransaction("TRX2026");

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[1]).toContain("%TRX2026%");
      expect(result).toEqual(mockRows);
    });

    it("should search by payment method", async () => {
      const mockRows = [
        {
          id: 2,
          trx_ref_number: "TRX20260624002",
          payment_method: "qris",
          status: "A",
        },
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await getTransaction("qris");

      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[1]).toContain("%qris%");
      expect(result).toEqual(mockRows);
    });

    it("should return empty array when no results", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await getTransaction("nonexistent");

      expect(result).toEqual([]);
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Connection refused"));

      await expect(getTransaction()).rejects.toThrow("Database error");
    });
  });

  // ==========================================
  // CREATE TRANSACTION (dummy insert)
  // ==========================================
  describe("createTransaction", () => {
    const validTransaction = {
      merchant_id: 1,
      mitra_id: 2,
      terminal_id: 3,
      trx_ref_number: "TRX20260624001",
      trx_type: "payment",
      amount: 50000,
      fee: 500,
      total_amount: 50500,
      payment_method: "qris",
      card_number: null,
      response_code: "00",
      response_message: "Success",
      trx_date: "2026-06-24T10:00:00.000Z",
      settlement_date: null,
      status: "A",
      created_by: "system",
    };

    it("should create transaction and return the inserted row", async () => {
      const mockResult = { id: 1, ...validTransaction };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await createTransaction(validTransaction);

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain("INSERT INTO t_transaction");
      expect(queryCall[1]).toContain("TRX20260624001");
      expect(queryCall[1]).toContain("payment");
      expect(queryCall[1]).toContain(50000);
      expect(queryCall[1]).toContain("qris");
      expect(result).toEqual(mockResult);
    });

    it("should handle transaction with card payment", async () => {
      const cardTransaction = {
        ...validTransaction,
        trx_ref_number: "TRX20260624002",
        payment_method: "debit",
        card_number: "****1234",
        amount: 150000,
        fee: 1500,
        total_amount: 151500,
      };

      const mockResult = { id: 2, ...cardTransaction };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await createTransaction(cardTransaction);

      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[1]).toContain("****1234");
      expect(queryCall[1]).toContain("debit");
      expect(result).toEqual(mockResult);
    });

    it("should handle failed transaction response", async () => {
      const failedTransaction = {
        ...validTransaction,
        trx_ref_number: "TRX20260624003",
        response_code: "51",
        response_message: "Insufficient funds",
        status: "I",
      };

      const mockResult = { id: 3, ...failedTransaction };
      pool.query.mockResolvedValue({ rows: [mockResult] });

      const result = await createTransaction(failedTransaction);

      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[1]).toContain("51");
      expect(queryCall[1]).toContain("Insufficient funds");
      expect(queryCall[1]).toContain("I");
      expect(result).toEqual(mockResult);
    });

    it("should throw error on database failure", async () => {
      pool.query.mockRejectedValue(new Error("Duplicate key"));

      await expect(createTransaction(validTransaction)).rejects.toThrow("Database error");
    });
  });
});
