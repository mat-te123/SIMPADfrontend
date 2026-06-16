/**
 * Test Configuration
 * Setup file for running tests with Vitest
 */

import { expect, afterEach, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Global test utilities
global.testUtils = {
  // Simulate network delay
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Mock API response
  mockResponse: (status, data) => ({
    status,
    data,
  }),

  // Check if email is valid UGM email
  isValidUGMEmail: (email) => email.includes("@mail.ugm.ac.id"),
};

// Configure test environment
process.env.VITE_API_MODE = "mock";
