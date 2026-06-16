import { describe, it, expect, vi } from 'vitest';
import { getPriceInCurrency } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';

vi.mock(import('../src/libs/currency.js'), () => ({
    getExchangeRate: vi.fn(),
}));

describe('getPriceInCurrency', () => {
    it('should return price in target currency', () => {
        const price = 10;
        const targetCurrency = 'AUD';
        const mockedRate = 1.5;

        vi.mocked(getExchangeRate).mockReturnValue(mockedRate);
        const result = getPriceInCurrency(price, targetCurrency);
        expect(result).toBe(15);
        expect(getExchangeRate).toHaveBeenCalledWith('USD', targetCurrency);
    });
});