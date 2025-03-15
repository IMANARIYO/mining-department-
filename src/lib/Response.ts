// /lib/Response.ts

import { NextResponse } from "next/server";

// Interface for the response structure
interface ResponseData {
  data?: any;
  error?: string;
  message?: string;
}

export default class Response {
  // Success response
  static success(status: number, data: any, message: string) {
    return NextResponse.json(
      {
        status: "success",
        data,
        error: null,
        message
      },
      { status }
    );
  }

  // Error response
  static error(status: number, error: string, message: string) {
    return NextResponse.json(
      {
        status: "error",
        data: null,
        error,
        message
      },
      { status }
    );
  }
}
