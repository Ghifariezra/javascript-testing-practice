import { describe, test, it, expect, beforeAll, afterAll } from "vitest";
import { calculateDiscount, canDrive, createProduct, fetchData, getCoupons, isPriceInRange, isStrongPassword, isValidUsername, Stack, validateUserInput } from "../src/core";

describe("Core Modules", () => {
    describe("getCoupons", () => {
        it("should return an array of coupons", () => {
            const coupons = getCoupons();

            expect(coupons).toBeInstanceOf(Array);
            expect(coupons.length).toBeGreaterThan(0);
            expect(coupons[0]).toHaveProperty('code');
            expect(coupons[0]).toHaveProperty('discount');
        });

        it("should return coupons with discount values between 0 and 1", () => {
            const coupons = getCoupons();

            for (const coupon of coupons) {
                expect(coupon.discount).toBeGreaterThan(0);
                expect(coupon.discount).toBeLessThan(1);
            }
        });

        it("should return coupons with non-empty codes", () => {
            const coupons = getCoupons();

            for (const coupon of coupons) {
                expect(coupon.code).toBeTruthy();
                expect(coupon.discount).toBeTruthy();
            }
        });

        it("should return coupons with unique codes", () => {
            const coupons = getCoupons();
            const codes = coupons.map(coupon => coupon.code);
            const uniqueCodes = new Set(codes);

            expect(uniqueCodes.size).toBe(codes.length);
        });

        it("should return coupons with discount values that are numbers", () => {
            const coupons = getCoupons();

            for (const coupon of coupons) {
                expect(typeof coupon.discount).toBe('number');
            }
        });

        it("should return coupons with code values that are strings", () => {
            const coupons = getCoupons();

            for (const coupon of coupons) {
                expect(typeof coupon.code).toBe('string');
            }
        });
    });

    describe("calculateDiscount", () => {
        const validPrice = 100;
        const validDiscountCode = 'SAVE20';

        it("should apply a 20% discount for the 'SAVE20' code", () => {
            const result = calculateDiscount(validPrice, validDiscountCode);
            expect(result).toBe(80);
        });

        it("should return invalid price for non-numeric price", () => {
            const result = calculateDiscount('invalid', validDiscountCode);
            expect(result).toBe('Invalid price');
        });

        it("should return invalid discount code for non-string discount code", () => {
            const result = calculateDiscount(validPrice, 123);
            expect(result).toBe('Invalid discount code');
        });

        it("should return the original price when an invalid discount code is provided", () => {
            const result = calculateDiscount(validPrice, 'INVALID_CODE');
            expect(result).toBe(validPrice);
        });
    });

    describe("validateUserInput", () => {
        const validUsername = 'validUser';
        const validAge = 25;

        it("should return 'Validation successful' for valid input", () => {
            const result = validateUserInput(validUsername, validAge);
            expect(result).toBe('Validation successful');
        });

        it("should return 'Invalid username' for a username that is too short", () => {
            const result = validateUserInput(validUsername.slice(0, 2), validAge);
            expect(result).toBe('Invalid username');
        });

        it("should return 'Invalid age' for an age that is too young", () => {
            const result = validateUserInput(validUsername, 17);
            expect(result).toBe('Invalid age');
        });
    });

    describe("isPriceInRange", () => {
        const price = 50;
        const min = 30;
        const max = 70;

        it("should return true if the price is within the range", () => {
            const result = isPriceInRange(price, min, max);
            expect(result).toBe(true);
        });

        it("should return false if the price is outside the range", () => {
            const result = isPriceInRange(price + 50, min, max);
            expect(result).toBe(false);
        });
    });

    describe("isValidUsername", () => {
        const validUsername = 'validUser';

        it("should return true for a valid username", () => {
            const result = isValidUsername(validUsername);
            expect(result).toBe(true);
        });

        it("should return false for a username that is too short", () => {
            const result = isValidUsername(validUsername.slice(0, 2));
            expect(result).toBe(false);
        });
    });

    describe("canDrive", () => {
        const validAgeUS = 16;
        const validAgeUK = 17;
        const validCountryUS = 'US';
        const validCountryUK = 'UK';

        it("should return true for a valid US age", () => {
            const result = canDrive(validAgeUS, validCountryUS);
            expect(result).toBe(true);
        });

        it("should return true for a valid UK age", () => {
            const result = canDrive(validAgeUK, validCountryUK);
            expect(result).toBe(true);
        });

        it("should return false for an age that is too young in the US", () => {
            const result = canDrive(validAgeUS - 1, validCountryUS);
            expect(result).toBe(false);
        });

        it("should return false for an age that is too young in the UK", () => {
            const result = canDrive(validAgeUK - 1, validCountryUK);
            expect(result).toBe(false);
        });

        it("should return 'Invalid country code' for an unsupported country code", () => {
            const result = canDrive(validAgeUS, 'INVALID');
            expect(result).toBe('Invalid country code');
        });
    });

    describe("fetchData", () => {
        // 1. Deklarasikan variabel di scope atas agar bisa diakses oleh semua blok 'it'
        let data;

        // 2. Gunakan beforeAll dengan async/await
        beforeAll(async () => {
            // Fetching hanya terjadi SATU KALI di sini
            data = await fetchData();
        });

        afterAll(() => {
            data = null;
        });

        // 3. Blok 'it' sekarang menjadi synchronous (tidak perlu async/await lagi)
        it("should fetch data successfully", () => {
            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeGreaterThan(0);
        });

        it("should return an array of numbers", () => {
            for (const item of data) {
                expect(typeof item).toBe('number');
            }
        });

        it("should return the expected data", () => {
            expect(data).toEqual([1, 2, 3]);
        });
    });

    describe("Stack", () => {
        it("should push an item onto the stack", () => {
            const stack = new Stack();
            stack.push(1);
            expect(stack.items).toContain(1);
        });

        it("should pop an item from the stack", () => {
            const stack = new Stack();
            stack.push(1);
            stack.push(2);
            expect(stack.pop()).toBe(2);
        });

        it("should return the top item from the stack", () => {
            const stack = new Stack();
            stack.push(1);
            stack.push(2);
            expect(stack.peek()).toBe(2);
        });

        it("should check if the stack is empty", () => {
            const stack = new Stack();
            expect(stack.isEmpty()).toBe(true);
            stack.push(1);
            expect(stack.isEmpty()).toBe(false);
        });

        it("should return the size of the stack", () => {
            const stack = new Stack();
            expect(stack.size()).toBe(0);
            stack.push(1);
            stack.push(2);
            expect(stack.size()).toBe(2);
        });

        it("should clear the stack", () => {
            const stack = new Stack();
            stack.push(1);
            stack.push(2);
            stack.clear();
            expect(stack.isEmpty()).toBe(true);
        });
    });

    describe("createProduct", () => {
        const validProduct = { name: 'Product 1', price: 100 };

        it("should create a product successfully", () => {
            const result = createProduct(validProduct);
            expect(result).toEqual({ success: true, message: 'Product was successfully published' });
        });

        it("should return an error for a product with a missing name", () => {
            const result = createProduct({ ...validProduct, name: '' });
            expect(result).toEqual({
                success: false,
                error: { code: 'invalid_name', message: 'Name is missing' },
            });
        });

        it("should return an error for a product with a non-positive price", () => {
            const result = createProduct({ ...validProduct, price: 0 });
            expect(result).toEqual({
                success: false,
                error: { code: 'invalid_price', message: 'Price is missing' },
            });
        });

        it("should return an error for a product with a negative price", () => {
            const result = createProduct({ ...validProduct, price: -1 });
            expect(result).toEqual({
                success: false,
                error: { code: 'invalid_price', message: 'Price is missing' },
            });
        });
    });

    describe("isStrongPassword", () => {
        const wrongPassword = 'weak';
        const rightPassword = 'Str0ngP@ssw0rd';

        it("should return false for a weak password", () => {
            const result = isStrongPassword(wrongPassword);
            expect(result).toBe(false);
        });

        it("should return true for a strong password", () => {
            const result = isStrongPassword(rightPassword);
            expect(result).toBe(true);
        });
    });
});