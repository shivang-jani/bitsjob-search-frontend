/**
 * Error Handler Utility
 * This file contains utility functions for handling API errors consistently
 * It prevents detailed error information from being exposed in the console
 */

interface ErrorResponse {
  message: string;
  status?: number;
}

/**
 * Handles API errors and returns a standardized error response
 * @param error - The error object caught in the try/catch block
 * @returns A standardized error response object
 */
export const handleApiError = async (error: any, response?: Response): Promise<ErrorResponse> => {
  // Prevent detailed error logging to console
  // Instead of console.error with the full error, we'll log a controlled message
  
  // Default error message
  let errorMessage = "An unexpected error occurred";
  let statusCode: number | undefined = undefined;
  
  // Handle Response errors (when we have a response object)
  if (response) {
    statusCode = response.status;
    
    // Handle specific HTTP status codes
    switch (response.status) {
      case 400:
        errorMessage = "Bad request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please log in again.";
        break;
      case 403:
        errorMessage = "403 Forbidden. You don't have permission to access this resource.";
        break;
      case 404:
        errorMessage = "Resource not found.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      default:
        // Try to get error message from response if possible
        try {
          const errorData = await response.text();
          if (errorData) {
            try {
              // Try to parse as JSON
              const parsedError = JSON.parse(errorData);
              errorMessage = parsedError.message || errorMessage;
            } catch {
              // If not JSON, use as plain text if it's not too long
              if (errorData.length < 100) {
                errorMessage = errorData;
              }
            }
          }
        } catch {
          // If we can't get the error message from response, use default
        }
    }
  } else if (error instanceof Error) {
    // For regular Error objects, use a generic message instead of exposing details
    if (error.message.includes("403") || error.message.toLowerCase().includes("forbidden")) {
      errorMessage = "403 Forbidden. You don't have permission to access this resource.";
      statusCode = 403;
    } else if (error.message.includes("401") || error.message.toLowerCase().includes("unauthorized")) {
      errorMessage = "Unauthorized. Please log in again.";
      statusCode = 401;
    } else if (error.message.includes("404") || error.message.toLowerCase().includes("not found")) {
      errorMessage = "Resource not found.";
      statusCode = 404;
    }
  }
  
  // Log a controlled message to console
  console.log(`API Error: ${errorMessage}`);
  
  return {
    message: errorMessage,
    status: statusCode
  };
};

/**
 * Logs an error to the console in a controlled way
 * @param context - The context where the error occurred
 * @param message - A custom message to display
 */
export const logError = (context: string, message: string): void => {
  console.log(`Error in ${context}: ${message}`);
};
