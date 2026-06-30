import { describe, it, expect, vi, afterEach } from 'vitest';
import { getDiscount, getPriceInCurrency, getShippingInfo, isOnline, login, renderPage, signUp, submitOrder } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email.js';
import security from '../src/libs/security.js';

vi.mock(import('../src/libs/currency.js'), () => ({
    getExchangeRate: vi.fn(),
}));

vi.mock(import('../src/libs/shipping.js'), () => ({
    getShippingQuote: vi.fn(),
}));

vi.mock(import('../src/libs/analytics.js'), async () => ({
    trackPageView: vi.fn(),
}));

vi.mock(import('../src/libs/payment.js'), async () => ({
    charge: vi.fn(),
}));

vi.mock(import('../src/libs/email.js'), async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule,
        sendEmail: vi.fn(),
    };
});

describe("Mocking Modules", () => {
    describe('getPriceInCurrency', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        it('should return price in target currency', () => {
            const price = 10;
            const targetCurrency = 'AUD';

            vi.mocked(getExchangeRate).mockReturnValue(1.5);

            const result = getPriceInCurrency(price, targetCurrency);

            expect(result).toBe(15);
            expect(getExchangeRate).toHaveBeenCalledWith('USD', targetCurrency);
            expect(getExchangeRate).toHaveBeenCalledTimes(1);
        });

        it('should return 0 if the price is 0', () => {
            const price = 0;
            const targetCurrency = 'EUR';

            vi.mocked(getExchangeRate).mockReturnValue(0.9);

            const result = getPriceInCurrency(price, targetCurrency);

            expect(result).toBe(0);
            expect(getExchangeRate).toHaveBeenCalledWith('USD', targetCurrency);
        });

        it('should return original price if target currency is USD', () => {
            const price = 50;
            const targetCurrency = 'USD';

            vi.mocked(getExchangeRate).mockReturnValue(1);

            const result = getPriceInCurrency(price, targetCurrency);

            expect(result).toBe(50);
            expect(getExchangeRate).toHaveBeenCalledWith('USD', 'USD');
        });
    });

    describe('getShippingInfo', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        it('should return shipping cost and estimated days for a valid destination', () => {
            const destination = 'New York';
            const mockQuote = { cost: 20, estimatedDays: 5 };
            vi.mocked(getShippingQuote).mockReturnValue(mockQuote);

            const result = getShippingInfo(destination);

            expect(result).toBe('Shipping Cost: $20 (5 Days)');
            expect(getShippingQuote).toHaveBeenCalledWith(destination);
        });

        it('should return "Shipping Unavailable" for an invalid destination', () => {
            const destination = 'Invalid City';
            vi.mocked(getShippingQuote).mockReturnValue(null);

            const result = getShippingInfo(destination);

            expect(result).toBe('Shipping Unavailable');
            expect(getShippingQuote).toHaveBeenCalledWith(destination);
        });
    });

    describe('renderPage', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        it('should call trackPageView with the correct path', async () => {
            const result = await renderPage();

            expect(trackPageView).toHaveBeenCalledWith('/home');
        });

        it('should return the correct HTML content', async () => {
            const result = await renderPage();

            expect(result).toBe('<div>content</div>');
        });

        it.fails('should call trackPageView once', async () => {
            const result = await renderPage();

            expect(trackPageView).toHaveBeenCalledTimes(5);
        });

        it.fails('should return the wrong HTML content', async () => {
            const result = await renderPage();

            expect(result).toBe('<div>wrong content</div>');
        });
    });

    describe('submitOrder', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        it('should return success true for a successful payment', async () => {
            const validCreditCard = {
                creditCardNumber: '4111111111111111',
                expirationDate: '12/25',
                cvv: '123'
            };
            const validOrder = { totalAmount: 100 };
            const paymentResult = { status: 'success' };

            vi.mocked(charge).mockResolvedValue(paymentResult);

            const result = await submitOrder(validOrder, validCreditCard);

            expect(result).toEqual({ success: true });
            expect(charge).toHaveBeenCalledWith(validCreditCard, validOrder.totalAmount);
        });

        it('should return success false for a failed payment', async () => {
            const validCreditCard = {
                creditCardNumber: '4111111111111111',
                expirationDate: '12/25',
                cvv: '123'
            };
            const validOrder = { totalAmount: 100 };
            const paymentResult = { status: 'failed' };

            vi.mocked(charge).mockResolvedValue(paymentResult);

            const result = await submitOrder(validOrder, validCreditCard);

            expect(result).toEqual({ success: false, error: 'payment_error' });
            expect(charge).toHaveBeenCalledWith(validCreditCard, validOrder.totalAmount);
        });
    });

    describe('signUp', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        it('should return false and NOT send an email if the email is invalid', async () => {
            const invalidEmail = 'bukan-format-email-yang-benar';
            const result = await signUp(invalidEmail);

            expect(result).toBe(false);

            expect(sendEmail).not.toHaveBeenCalled();
        });

        it('should return true and send a welcome email if the email is valid', async () => {
            const validEmail = 'budi@example.com';
            const result = await signUp(validEmail);

            expect(result).toBe(true);

            expect(sendEmail).toHaveBeenCalledWith(validEmail, 'Welcome aboard!');
            expect(sendEmail).toHaveBeenCalledTimes(1);
        });
    });

    describe('login', () => {
        afterEach(() => {
            vi.clearAllMocks();
            vi.restoreAllMocks();
        });

        it('should email the generated security code', async () => {
            const email = 'budi@example.com';
            const expectedCode = 123456;
            const spy = vi.spyOn(security, 'generateCode').mockReturnValue(expectedCode);
            await login(email);

            expect(sendEmail).toHaveBeenCalledWith(email, expectedCode.toString());
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('isOnline', () => {
        afterEach(() => {
            vi.useRealTimers();
        });

        it('should return true if the current hour is between 8 and 20', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2024-01-01T10:00:00'));

            const result = isOnline();
            expect(result).toBe(true);
        });

        it('should return false if the current hour is not between 8 and 20', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2024-01-01T22:00:00'));

            const result = isOnline();
            expect(result).toBe(false);
        });
    });

    describe('getDiscount', () => {
        afterEach(() => {
            vi.useRealTimers();
        });

        it('should return 0.2 if the current date is Christmas Day', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2024-12-25T12:00:00'));

            const result = getDiscount();
            expect(result).toBe(0.2);
        });

        it('should return 0 if the current date is not Christmas Day', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2024-01-01T12:00:00'));

            const result = getDiscount();
            expect(result).toBe(0);
        });
    });
});