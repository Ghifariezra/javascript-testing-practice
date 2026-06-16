import { describe, test, it, expect } from "vitest";
import { calculateAverage, calculateFactorial, fizzBuzz, max } from "../src/intro";

describe("Intro", () => {
    describe("Max", () => {
        it("should return the first argument if it is greater", () => {
            // AAA Pattern
            // Arrange: Turn on the TV
            const a = 2;
            const b = 1;

            // Act: Press the power button
            const result = max(a, b);

            // Assert: Verify TV is off
            expect(result).toBe(2);
        });

        it("should return the second argument if it is greater", () => {
            // AAA Pattern
            // Arrange: Turn on the TV
            const a = 1;
            const b = 2;

            // Act: Press the power button
            const result = max(a, b);

            // Assert: Verify TV is off
            expect(result).toBe(2);
        });

        it("should return the first argument if both are equal", () => {
            // AAA Pattern
            // Arrange: Turn on the TV
            const a = 1;
            const b = 1;

            // Act: Press the power button
            const result = max(a, b);

            // Assert: Verify TV is off
            expect(result).toBe(1);
        });
    });


    describe("FizzBuzz", () => {
        it("should return 'Fizz' if the number is divisible by 3", () => {
            const fizz = 3;
            const result = fizzBuzz(fizz);
            expect(result).toBeTypeOf('string');
            expect(result).toBe('Fizz');
        });

        it("should return 'Buzz' if the number is divisible by 5", () => {
            const buzz = 5;
            const result = fizzBuzz(buzz);
            expect(result).toBeTypeOf('string');
            expect(result).toBe('Buzz');
        });

        it("should return 'FizzBuzz' if the number is divisible by both 3 and 5", () => {
            const fizzBuzzNum = 15;
            const result = fizzBuzz(fizzBuzzNum);
            expect(result).toBeTypeOf('string');
            expect(result).toBe('FizzBuzz');
        });

        it("should return the number as a string if it is not divisible by 3 or 5", () => {
            const num = 7;
            const result = fizzBuzz(num);
            expect(result).toBeTypeOf('string');
            expect(result).toBe('7');
        });
    });

    describe("Calculate Average", () => {
        it("should return the average of an array of numbers", () => {
            const numbers = [1, 2, 3, 4, 5];
            const result = calculateAverage(numbers);
            expect(result).toBe(3);
        });

        it("should return NaN if the array is empty", () => {
            const numbers = [];
            const result = calculateAverage(numbers);
            expect(result).toBeNaN();
        });
    });

    describe("Factorial", () => {
        it("should return 120 if we calculate the factorial of a number", () => {
            const num = 5;
            const result = calculateFactorial(num);
            expect(result).toBe(120);
        });

        it("should return 1 if the number is 0", () => {
            const num = 0;
            const result = calculateFactorial(num);
            expect(result).toBe(1);
        });

        it("should return 1 if the number is 1", () => {
            const num = 1;
            const result = calculateFactorial(num);
            expect(result).toBe(1);
        });

        it("should return undefined if the number is negative", () => {
            const num = -1;
            const result = calculateFactorial(num);
            expect(result).toBeUndefined();
        });
    });
});