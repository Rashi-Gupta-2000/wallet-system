import { API_CONFIG } from "../config/api";
import { handleApiError, retryApiCall } from "../utils/apiHelpers";

class WalletAPI {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const apiCall = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      try {
        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        return await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        throw new Error(handleApiError(error));
      }
    };

    return retryApiCall(
      apiCall,
      API_CONFIG.RETRY_ATTEMPTS,
      API_CONFIG.RETRY_DELAY
    );
  }


  // POST /setup
  async createWallet(name, balance = 0) {
    return this.request("/setup", {
      method: "POST",
      body: JSON.stringify({ name, balance: parseFloat(balance) }),
    });
  }

  // POST /transact/:walletId
  async createTransaction(walletId, amount, description) {
    return this.request(`/transact/${walletId}`, {
      method: "POST",
      body: JSON.stringify({
        amount: parseFloat(amount), 
        description: description.trim()
      }),
    });
  }

  // GET /transactions?walletId=:id&skip=:skip&limit=:limit
  async getTransactions(walletId, skip = 0, limit = 100) {
    const queryParams = new URLSearchParams({
      walletId,
      skip: skip.toString(),
      limit: limit.toString(),
    });
    return this.request(`/transactions?${queryParams}`);
  }

  // GET /wallet/:id
  async getWallet(walletId) {
    return this.request(`/wallet/${walletId}`);
  }
}

export const walletApi = new WalletAPI();
